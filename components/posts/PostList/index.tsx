import { ReactElement } from 'react';
import classNames from 'classnames';

import { IPost } from '@/types/cms';
import { generateRoute } from '@/services/cms';
import Container from '@/components/Container';
import { Headline } from '@/components/ui';
import { PostCard } from '@/components/cards';

interface Props {
  posts: IPost[];
  gridStyle?: 'tight' | 'relaxed';
  hoverEffect?: boolean;
  showHeading?: boolean;
  compact?: boolean;
  classes?: string;
}

export default function PostList(props: Props): ReactElement {
  const {
    posts,
    gridStyle = 'relaxed',
    hoverEffect,
    showHeading = true,
    compact,
    classes,
  } = props;
  const cardClasses = classNames(
    'md:w-1/2 mb-5',
    'lg:w-1/3 lg:max-w-sm lg:px-3'
  );
  const gridClasses = [
    gridStyle === 'tight' && 'lg:max-w-screen-lg',
    gridStyle === 'relaxed' && 'lg:max-w-screen-xl',
  ];
  return (
    <div className={classNames('mt-8', 'lg:mt-0', classes)}>
      {showHeading && (
        <Headline
          color="gray-dark"
          classes={classNames('text-sm font-mono pb-4', 'md:pb-0', 'lg:pb-4')}
          containerWidths={{
            small: '8rem',
            medium: '24rem',
            large: '1024px',
          }}
        >
          More posts
        </Headline>
      )}
      <Container
        classes={classNames(
          'px-0 pb-0 flex flex-wrap justify-center max-w-screen-md',
          'md:px-0 md:pb-0 md:justify-start',
          'lg:px-24',
          gridClasses
        )}
      >
        {posts?.map((post) => {
          return (
            <PostCard
              route={generateRoute(post.slug)}
              hoverEffect={hoverEffect}
              compact={compact}
              classes={classNames(cardClasses)}
              key={post.id}
              {...post}
            />
          );
        })}
      </Container>
    </div>
  );
}
