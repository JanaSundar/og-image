/* eslint-disable @next/next/no-page-custom-font */
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const title = searchParams.get('title');
  const tags = searchParams.get('tags');

  const [params, setParams] = useState({
    title: null,
    tags: [],
  });

  useEffect(() => {
    setParams({
      title,
      tags: tags || [],
    });
  }, [title, tags]);

  return (
    <div className={'container'}>
      <Head>
        <title>JanaSundar</title>
      </Head>

      <div className="content">
        <h1>{params.title}</h1>
        <div className="tags">
          {params.tags.map((tag) => {
            return <span key={tag}>#{tag}</span>;
          })}
        </div>
      </div>
      <div className="logo">
        <Image src="/logo.svg" alt="logo" width="100%" height="100%" />
        <div className="handle">@Jana__Sundar</div>
      </div>
    </div>
  );
}
