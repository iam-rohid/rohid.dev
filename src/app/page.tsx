import keystaticReader from "@/lib/keystaticReader";
import Link from "next/link";

export default async function HomePage() {
  const posts = await keystaticReader.collections.posts.all();
  const homepage = await keystaticReader.singletons.settings.read();
  return (
    <div>
      <h1>{homepage?.headline}</h1>

      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <h3>{post.entry.title}</h3>
              <p>{post.entry.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
