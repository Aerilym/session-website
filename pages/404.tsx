import classNames from 'classnames';

import Layout from '@components/layout';

export default function Custom404() {
  return (
    <Layout title="Page not found - Session">
      <section
        className={classNames(
          'py-16 px-2 mx-auto text-center',
          'md:py-16 md:px-6',
          'lg:p-24'
        )}
      >
        <h1
          className={classNames(
            'text-primary-dark text-5xl font-semibold mb-8'
          )}
        >
          This page doesn't seem to exist.
        </h1>
        <p className={classNames('text-gray text-xl', 'lg:text-2xl')}>
          It looks like the link pointing here was faulty. Maybe try searching?
        </p>
        {/* TODO add search box */}
      </section>
    </Layout>
  );
}
