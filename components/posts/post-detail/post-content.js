import Image from "next/image";
import PostHeader from "./post-header";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import classes from "./post-content.module.css";

// const DUMMY_POST = {
//   slug: "getting-started-with-nextjs-1",
//   title: "Getting Started with NextJS",
//   image: "getting-started-nextjs.png",
//   excerpt:
//     "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.",
//   date: "2022-02-10",
//   content: "# This is a first post"
// };

function PostContent(props) {
  const { slug, title, image, excerpt, date, content } = props.post;

  const imagePath = `/images/posts/${slug}/${image}`;

  const customRenderers = {
    img(image) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={300}
        />
      );
    },

    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];

        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1]; // className is something like language-js => We need the "js" part here
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
          children={children}
        />
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
