/**
 * Page components:
 * 1. Hero => Present self
 * 2. Featured Posts
 *
 */

import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import { getFeaturedPosts } from "../lib/posts-util";
import Head from "next/head";
import Hero from "../components/home-page/hero";

// const DUMMY_POSTS = [
//   {
//     slug: "getting-started-with-nextjs-1",
//     title: "Getting Started with NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
//     date: "2022-02-10",
//   },
//   {
//     slug: "getting-started-with-nextjs-2",
//     title: "Getting Started with NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
//     date: "2022-02-10",
//   },
//   {
//     slug: "getting-started-with-nextjs-3",
//     title: "Getting Started with NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
//     date: "2022-02-10",
//   },
//   {
//     slug: "getting-started-with-nextjs-4",
//     title: "Getting Started with NextJS",
//     image: "getting-started-nextjs.png",
//     excerpt:
//       "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
//     date: "2022-02-10",
//   },
// ];

function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>Tristan's Blog</title>
        <meta name="description" content="I like cheese." />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
