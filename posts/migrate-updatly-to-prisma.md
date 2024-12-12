---
title: 'Migrate Updatly to Prisma'
date: '2024-12-12'
---

I've been working on a project called [Updatly](https://updatly.ramgoel.com/). It's a platform that helps you manage your changelog. I've been using MongoDB for all my projects for a while now, but I've been thinking about learning Prisma for a while now.

&ZeroWidthSpace;
&ZeroWidthSpace;

Sadly in my current role, we don't use Prisma and also very less use GraphQL. so no scope there. I had to do this in my side project.

&ZeroWidthSpace;
&ZeroWidthSpace;

I had the option of adding it to Noterr as well, but it's APIs get used by browser extension as well and I didn't want to break it.

&ZeroWidthSpace;
&ZeroWidthSpace;

So I decided to migrate Updatly to Prisma, so that I can learn it by regularly using it in my side project.

&ZeroWidthSpace;
&ZeroWidthSpace;

Now the hard part, I have to actually migrate it. Firstly I ran the command to install Prisma `npm i --save-dev prisma`.

&ZeroWidthSpace;
&ZeroWidthSpace;

After installing Prisma, I ran the command to initialize Prisma in my nextjs project. `npx prisma init --datasource-provider mongodb`

&ZeroWidthSpace;
&ZeroWidthSpace;

This will create a new folder & file called `prisma/schema.prisma` in my project, and updated the `.env` file to include the `DATABASE_URL` variable. I just updated the `DATABASE_URL` to my MongoDB Atlas URL (which I've already had in .env file).

&ZeroWidthSpace;
&ZeroWidthSpace;

Next task was to add the models to the `schema.prisma` file. Prisma made this very easy, I just had to run `npx prisma db pull` to generate the models from my MongoDB database.

&ZeroWidthSpace;
&ZeroWidthSpace;

This will generate the models in the `schema.prisma` file, I made few changes and I was ready to go.

&ZeroWidthSpace;
&ZeroWidthSpace;

Next task was to actually migrate all the imports from mongoose, I started with /api folders and replaced all the mongoose imports with Prisma. (Cursor got my back here)

&ZeroWidthSpace;
&ZeroWidthSpace;

Then I had to migrate the TS interfaces, I had manually written all the interfaces for the models earlier. It was time to infer them from Prisma. So created a new file called `types.ts` and added the `prisma` types to it.

&ZeroWidthSpace;
&ZeroWidthSpace;

It was time to test, Updatly has simple user flow, I just had to test if the user flow was working or not. Checked the auth, CRUD and it was good. Now it was time to deploy.

&ZeroWidthSpace;
&ZeroWidthSpace;

It was my first time deploying Prisma to Vercel, and I got a error saying 'Prisma not able to run on build', I had to modify the build command in `package.json` to `npx prisma generate && next build`.

&ZeroWidthSpace;
&ZeroWidthSpace;

After deploying, It was working fine, I did tested the user flow again just to make sure.
