# Paginating Everything: Tables, Dropdowns, and API Calls

*How we stopped loading 10,000 records and learned to love the offset.*

---

It started with a Slack message at 4:47 PM on a Friday.

"Dashboard is down in production."

I opened the network tab. The `/api/users` endpoint was trying to return 47,000 records. The response was 12MB. The browser gave up somewhere around the 8-second mark.

We'd been so careful during development. Sample data, fast queries, everything snappy. But nobody thought to ask: "What happens when this thing actually has users?"

That weekend, I learned more about pagination than I ever wanted to know.

---

## The Rabbit Hole

Pagination looks simple from the outside. Show 20 items. Add a "Next" button. Done, right?

Then you start building it.

What happens when someone's on page 5 and searches for something? Do they stay on page 5 of the search results? (No. Page 5 might not exist anymore.) Do they go back to page 1? (Yes, but you have to remember to do that *every time* a filter changes.)

What about sharing links? If I send you `/users?page=3`, do you actually see page 3? Or does the app ignore the URL and dump you on page 1 because the state lives in React somewhere?

What about dropdowns? You can't show page numbers in a 200-pixel-wide select menu. But you also can't load 10,000 options at once.

And what about those fancy APIs that use cursors instead of page numbers? Suddenly `?page=3` doesn't mean anything — you need a cryptic token like `cursor=eyJpZCI6MTIzfQ==` to get the next batch.

Every "simple" pagination feature I've built has turned into a week-long archaeology expedition through edge cases.

So we stopped building them one-off. We built a system instead.

---

## The Insight That Changed Everything

Here's what took me embarrassingly long to realize: **the URL is a state manager**.

Think about it. The URL has been storing application state since 1991. It survives page refreshes. It works with the back button. You can copy it and send it to someone, and they'll see exactly what you see.

Meanwhile, I was storing pagination state in React. `useState` for the current page. Another `useState` for the search query. Maybe a context if I was feeling fancy.

Then users would refresh the page and lose everything. Or share a link that didn't work. Or hit the back button and get confused when the filters didn't change.

The URL was right there the whole time.

`/users?page=3&search=john&status=active`

Everything you need. Survives refresh. Shareable. Back button works. And it's debuggable — you can literally *see* the application state in the address bar.

Once we moved pagination state to the URL, half our bugs disappeared overnight.

---

## The Architecture

After three rewrites (and two production incidents), we landed on a structure that's held up across 20+ paginated views:

```
┌─────────────────────────────────────────────────────┐
│  UI Components (Table, Dropdown)                    │
├─────────────────────────────────────────────────────┤
│  URL Query Params (?page=1&search=...)              │
├─────────────────────────────────────────────────────┤
│  React Query (fetching + caching)                   │
└─────────────────────────────────────────────────────┘
```

Three layers. Each does one thing.

The UI components don't know how state is stored. They just receive `page`, `setPage`, `isLoading`, `data`. 

The URL holds the truth. Current page, filters, search query — all of it.

React Query handles fetching and caching. It watches the URL params and refetches when they change.

When you want to add pagination to a new page, you plug into this system. You don't reinvent it.

---

## The Reusable Piece

The magic is a single hook: `usePaginationParams`.

It reads the current URL. It provides setters that update the URL. And — this is the important part — it automatically resets to page 1 whenever a filter changes.

That last bit is crucial. The most common pagination bug is: user is on page 5, searches for something, stays on page 5 of search results, sees "No results found." The fix is obvious in hindsight. But when you're writing pagination logic by hand, you forget. Every. Single. Time.

So we baked it into the hook. Call `setSearch("john")` and it *also* sets page to 1. You literally cannot forget, because the hook does it for you.

This one hook is shared across every paginated page in the app. One place to fix bugs. One place to add features. One pattern everyone on the team knows.

---

## Tables: Three Flavors

Not all APIs are created equal. We've encountered three types, and each needs slightly different handling.

**The Happy Path: Offset Pagination**

The API returns `{ items: [...], total: 1234 }`. You know exactly how many pages exist. You can show "Page 3 of 62" and render page number buttons. Life is good.

**The Guessing Game: No Total Count**

Some APIs just return `{ items: [...] }`. No total. Maybe counting is expensive. Maybe the backend team had a deadline.

The trick: if you ask for 20 items and get 15 back, there's no next page. Simple heuristic, works every time. You lose the "Page X of Y" display, but you can still navigate.

**The Modern Way: Cursor Pagination**

Some APIs return `{ items: [...], nextCursor: "abc123" }`. No page numbers at all. You pass the cursor to get the next batch.

This is actually more robust for large datasets (no issues with items shifting between pages), but you lose the ability to jump to page 47. You get "Next" and "Previous." That's it.

Our Table component handles all three. You tell it which mode you're in, and it renders the appropriate controls.

---

## Dropdowns: A Different Problem

Tables have room for pagination controls. Dropdowns don't.

You can't show "Page 2 of 15" in a select menu. But you also can't load 10,000 users into a dropdown and let the browser deal with it.

The answer is infinite scroll. Load 8 items. When the user scrolls near the bottom, load 8 more. Append them to the list. Repeat until you run out.

It sounds simple, but there's a subtle bug that bites everyone: scroll handlers fire *a lot*. Like, 60 times per second while someone's scrolling. If you trigger a fetch every time, you'll fire hundreds of duplicate requests.

The fix is a loading flag — but not a `useState` flag. State updates trigger re-renders. In a scroll handler, that's chaos. You need a `useRef` that you flip synchronously. Check the ref, flip it, fetch, flip it back when done.

The other gotcha: search and load-more work differently.

When someone searches, you *replace* the options and reset to page 1.
When someone scrolls to load more, you *append* to the options and increment the page.

Mix these up and you'll have duplicate items showing up in your dropdown. Don't ask how I know.

---

## The Bugs That'll Get You

After building this system across 20+ views, the same bugs keep appearing. Here's the hit list:

**Forgetting to reset page on filter change.** User is on page 5, applies a filter, page 5 of filtered results doesn't exist. They see an empty page. Bake the reset into your hook so it's automatic.

**Missing parameters in the query key.** React Query uses the query key to decide if it needs to refetch. If your key is `['users', page]` but you're also filtering by status, changing the status won't trigger a refetch. Include *everything* that affects the response: `['users', page, pageSize, search, status]`.

**Not debouncing search.** Every keystroke fires a fetch. User types "john" — that's 4 requests. Debounce by 300-400ms. But remember to clean up the timeout if the component unmounts, or you'll get "can't update state on unmounted component" errors.

**Scroll handler race conditions.** User scrolls fast, triggers 5 load-more fetches, gets duplicate items. Use a ref to track loading state and bail early if a fetch is already in progress.

---

## The Payoff

Here's what pagination looks like now when we add it to a new page:

1. Import the shared `usePaginationParams` hook
2. Write a small data-fetching hook that uses those params
3. Pass everything to the Table component

That's it. The URL handling is done. The page-reset-on-filter-change is done. The debouncing pattern is established. The query key structure is known.

What used to take a day now takes an hour. And more importantly, it works the same way everywhere. New team members see one paginated page, they understand them all.

---

## The Boring Conclusion

Pagination isn't exciting. Nobody's writing blog posts about revolutionary new approaches to offset calculation. (Well, I guess I am now.)

But that's the point. Pagination should be boring. It should be predictable. You should be able to add it to a new page without thinking too hard.

The URL is your state manager. One hook handles the params. Query keys include everything. Page resets on filter change.

Boring patterns, applied consistently, across every paginated view.

That's it. That's the whole secret.

Now go paginate something.

---

## Appendix: The Code

Here's the shared hook that powers everything. Drop it in your project, adjust for your router, and you're set.

```typescript
// usePaginationParams.ts
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const usePaginationParams = (defaults = { pageSize: 20 }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params = useMemo(() => ({
    page: Number(searchParams.get('page')) || 1,
    pageSize: Number(searchParams.get('pageSize')) || defaults.pageSize,
    search: searchParams.get('search') || '',
  }), [searchParams, defaults.pageSize]);

  const setParams = useCallback((updates: Record<string, any>, resetPage = false) => {
    const newParams = new URLSearchParams(searchParams.toString());
    
    if (resetPage) newParams.set('page', '1');
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value == null) newParams.delete(key);
      else newParams.set(key, String(value));
    });

    router.push(`${pathname}?${newParams.toString()}`);
  }, [searchParams, router, pathname]);

  return {
    ...params,
    setPage: (page: number) => setParams({ page }),
    setSearch: (search: string) => setParams({ search }, true), // auto-resets page
    setParams,
    resetAll: () => router.push(pathname),
  };
};
```

The rest — data fetching hooks, Table components, dropdown infinite scroll — you build to fit your stack. But this hook is the foundation. Everything else plugs into it.
