import { ReactElement } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import classNames from 'classnames';

import { CMS, METADATA } from '@/constants';
import { IPost, ITagList } from '@/types/cms';
import { fetchBlogEntriesByTag, fetchTagList } from '@/services/cms';

import { Layout } from '@/components/ui';
import Container from '@/components/Container';
import { PostList } from '@/components/posts';

interface Props {
  tag: string;
  posts: IPost[];
}

export default function Tag(props: Props): ReactElement {
  const { tag, posts } = props;
  return (
    <Layout title={`${tag} Archives`} metadata={METADATA.BLOG_PAGE}>
      <section>
        <Container
          classes={classNames(
            'p-12 pb-0 pl-3 pr-3',
            'md:pt-16 md:pb-0 md:pl-3 md:pr-3',
            'lg:pt-8 lg:pb-16 lg:pl-24 lg:pr-24 lg:max-w-screen-xl'
          )}
        >
          <h1
            className={classNames(
              'text-primary-dark text-4xl font-bold bg-gray-50 border border-gray-200 py-3 px-2',
              'lg:mx-3',
              'xl:max-w-4xl'
            )}
          >
            {tag}
          </h1>
        </Container>
        <PostList posts={posts} showHeading={false} />
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const tag = String(context.params?.tag);
  const { entries: posts, total: totalPosts } = await fetchBlogEntriesByTag(
    tag
  );

  return {
    props: { tag, posts },
    revalidate: CMS.CONTENT_REVALIDATE_RATE,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tags: ITagList = await fetchTagList();
  const paths = Object.values(tags).map((tag) => {
    return {
      params: {
        tag,
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
