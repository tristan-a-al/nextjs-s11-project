import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDir = path.join(process.cwd(), "posts");

function getPostData(postId) {
  const postSlug = postId.replace(/\.md$/, ""); // removes the file extension
  const filePath = path.join(postsDir, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  const postData = {
    slug: postSlug,
    ...data,
    content: content,
  };

  return postData;
}

export function getAllPosts() {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  console.log("All Posts: ", allPosts);
  const featuredPosts = allPosts.filter((post) => post.isFeatured);
  console.log("Featured Posts: ", featuredPosts);

  return featuredPosts;
}

export function getPostsFiles() {
    return fs.readdirSync(postsDir);
}