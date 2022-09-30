import { useRouter } from 'next/router';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { getRandomColor } from '../utils/getRandomColors';

export default function Home() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);

  const title = searchParams.get('title');
  const background = searchParams.get('background');
  const color = searchParams.get('color');

  const [params, setParams] = React.useState({
    title: null,
    color: null,
    background: null,
  });

  React.useEffect(() => {
    setParams({
      title,
      color,
      background,
    });
  }, [title, color, background]);

  return (
    <>
      <Head>
        <title>JanaSundar</title>
      </Head>

      <div
        className={`w-[1200px] h-[630px] flex justify-center items-center`}
        style={{
          background: params.background ?? '#121212',
        }}>
        <h1
          className={`font-sans text-6xl leading-normal tracking-wide font-bold text-center w-9/12
          bg-clip-text text-transparent gradient-text`}
          style={{
            background: getRandomColor(),
          }}>
          {params.title}
        </h1>
      </div>
    </>
  );
}
