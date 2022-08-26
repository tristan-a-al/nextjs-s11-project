import { Fragment } from "react";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
// import ReactMarkdown from "react-markdown";

function SinglePostPage(props) {
  return (
    <Fragment>
      <Head>
        <title>{props.post./*postData.data.*/title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent postContent={props.post} />
    </Fragment>
  );
}

export function getStaticProps(context) {
  const { params } = context;
  const { slug } = params;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: "blocking",
  };
}

export default SinglePostPage;
