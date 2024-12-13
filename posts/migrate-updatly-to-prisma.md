---
title: 'Migrate Updatly to Prisma'
date: '2024-12-12'
youtube: 'https://www.youtube.com/embed/xjiunYXld4Y?si=0NSL7y-wOvSI1YKo'
---

I've recently migrated [Updatly](https://updatly.ramgoel.com/) - a changelog tool for SaaS, from Mongoose to Prisma.

&ZeroWidthSpace;
&ZeroWidthSpace;

Includes general refactoring, but the interesting part is that Vercel cache the dependencies of the project on the first build, and don't actually run `npm i` for subsequent builds until one of the dependency change.

&ZeroWidthSpace;
&ZeroWidthSpace;

But what's with Prisma? Prisma uses a postinstall hook which runs everytime after the dependencies are installed.

&ZeroWidthSpace;
&ZeroWidthSpace;

Suppose your dependency don't change but your schema keeps updating everytime you push, the `npx prisma generate` command will not run because `npm i` isn't running on these builds.

&ZeroWidthSpace;
&ZeroWidthSpace;

Due to this your project in production will have an outdated Prisma Client unless you update one of the project dependecies.

&ZeroWidthSpace;
&ZeroWidthSpace;

FIX? just change build command in package.json from `npm run build` -> `npx prisma generate && npm run build` to make sure prisma generate runs everytime you push.

&ZeroWidthSpace;
&ZeroWidthSpace;

Official docs : [Vercel Caching Issue](https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/vercel-caching-issue)
