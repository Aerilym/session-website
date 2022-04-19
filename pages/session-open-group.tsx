import { Button, Headline, Layout } from '@/components/ui';
import { ReactElement, useState } from 'react';

import Container from '@/components/Container';
import Image from 'next/image';
import { LINKS } from '@/constants';
import METADATA from '@/constants/metadata';
import classNames from 'classnames';
import { copyToClipboard } from '@/utils/clipboard';

export default function OpenGroup(): ReactElement {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopy = () => {
    if (isCopied) {
      setIsCopied(false);
      return;
    }
    copyToClipboard(LINKS.SESSION.OPEN_GROUP_SERVER, setIsCopied);
  };
  return (
    <Layout title="Open Group Channel" metadata={METADATA.OPEN_GROUP_PAGE}>
      <section>
        <Headline
          color="gray-dark"
          classes={classNames(
            'font-mono py-8 justify-center',
            'md:text-lg md:mx-0 md:justify-start',
            'lg:pt-4 lg:pb-16'
          )}
          containerWidths={{
            small: '100%',
            medium: '34rem',
            large: '62rem',
          }}
        >
          Session Open Group Channel
        </Headline>
        <Container
          classes={classNames(
            'text-center pt-0 px-4 pb-12',
            'md:pt-4 md:pb-16',
            'lg:pb-16'
          )}
        >
          <h1
            className={classNames(
              'text-gray-dark text-2xl font-helvetica font-semibold mb-6',
              'md:text-4xl'
            )}
          >
            Scan this QR code on Session to join our open group chat
          </h1>
          <p className={classNames('text-gray-dark font-semibold mb-8')}>
            To join, open Session and tap and hold on the{' '}
            <span
              className={classNames('inline-block align-middle mx-1 w-7 h-7')}
            >
              <Image
                src="/assets/images/session-ui-add.png"
                alt="session add chat button"
                title="session add chat button"
                width="121px"
                height="121px"
                priority={true}
              />
            </span>{' '}
            icon, then tap on the{' '}
            <span
              className={classNames('inline-block align-middle mx-1 w-7 h-7')}
            >
              <Image
                src="/assets/images/session-ui-opengroup.png"
                alt="session opengroup button"
                title="session opengroup button"
                width="121px"
                height="121px"
                priority={true}
              />
            </span>{' '}
            option.
          </p>
          <div className={classNames('mx-auto mb-8')}>
            <Image
              src="/assets/images/qr-code.png"
              alt="session open group qr code"
              width="208px"
              height="208px"
              priority={true}
            />
          </div>
          <p className={classNames('text-gray-dark font-semibold')}>
            Otherwise you can click the button below and copy our group chat URL
            to your clipboard.
          </p>
          <Button
            bgColor={isCopied ? 'black' : 'primary'}
            textColor={isCopied ? 'primary' : 'black'}
            fontWeight="bold"
            animate={true}
            hoverEffect={false}
            classes={classNames('w-40 px-0 mt-8')}
            onClick={handleCopy}
          >
            {isCopied ? 'Copied!' : 'Copy URL'}
          </Button>
        </Container>
      </section>
    </Layout>
  );
}
