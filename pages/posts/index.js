import { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";
import Head from "next/head";

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

function AllPostsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="Something relevant to this page." />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
