import { Button } from '~/components/button';
import { DecoderText } from '~/components/decoder-text';
import { Divider } from '~/components/divider';
import { Footer } from '~/components/footer';
import { Heading } from '~/components/heading';
import { Image } from '~/components/image';
import { Section } from '~/components/section';
import { Text } from '~/components/text';
import styles from './skills.module.css';

export function Skills() {
  return (
    <article className={styles.articles}>
      <Section className={styles.content}>
        <div className={styles.grid}>
          <header className={styles.header}>
            <Heading className={styles.heading} level={5} as="h1">
              <DecoderText text="Resume Preview" />
            </Heading>
            <Barcode className={styles.barcode} />
            <div className={styles.skillList}>
              <div className={styles.skillItem}>
                <div className={styles.skillLabel}>Product Designer</div>
                <div>UI/UX, Figma, Motion Design, Prototyping</div>
              </div>
              <div className={styles.skillItem}>
                <div className={styles.skillLabel}>Full-stack Developer</div>
                <div>React, Remix, Three.js, CSS Modules, Git</div>
              </div>
              <div className={styles.skillItem}>
                <div className={styles.skillLabel}>Documentation & Others</div>
                <div>LaTeX</div>
              </div>
              <div className={styles.skillItem}>
                <div className={styles.skillLabel}>Programming Languages</div>
                <div className={styles.skillRow}>
                  <span>JavaScript</span>
                  <div className={styles.levelContainer} title="Proficient">
                    <div className={styles.levelFill} style={{ width: '90%' }} />
                  </div>
                </div>
                <div className={styles.skillRow}>
                  <span>Python</span>
                  <div className={styles.levelContainer} title="Proficient">
                    <div className={styles.levelFill} style={{ width: '90%' }} />
                  </div>
                </div>
                <div className={styles.skillRow}>
                  <span>C++</span>
                  <div className={styles.levelContainer} title="Intermediate">
                    <div className={styles.levelFill} style={{ width: '50%' }} />
                  </div>
                </div>
              </div>
            </div>
          </header>

          <article className={styles.post} data-featured="true">
            <div className={styles.postImage}>
              <Image
                srcSet="/site-preview.png"
                src="/site-preview.png"
                alt="Resume Preview"
                role="presentation"
              />
            </div>
            <a
              href="/oriana_rocafull_se_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.postLink}
            >
              <div className={styles.postDetails}>
                <div aria-hidden className={styles.postDate}>
                  <Divider notchWidth="64px" notchHeight="8px" />
                  Resume
                </div>
                <Heading as="h2" level={2}>
                  Oriana Rocafull
                </Heading>
                <Text size="l" as="p">
                  Full-stack developer and Product Designer specializing in React, Remix, Three.js, and inclusive design.
                  Experience with modern web technologies, authentication flows, and 3D interactions.
                </Text>
                <div className={styles.postFooter}>
                  <Button secondary iconHoverShift icon="arrow-right" as="div">
                    View full resume
                  </Button>
                </div>
              </div>
            </a>
          </article>
        </div>
      </Section>
      <Footer />
    </article>
  );
}

function Barcode({ className }) {
  return (
    <svg
      className={className}
      width="153"
      height="20"
      fill="currentColor"
      viewBox="0 0 153 20"
    >
      <path
        fillOpacity=".6"
        d="M153 0v20h-2V0h2Zm-4 0v20h-4V0h4Zm-6 0v20h-2V0h2Zm-4 4v3h-2V4h2Zm-5 0V0h3v4h-3Zm-2 0h2v6h-2V4Zm0 0h-2V0h2v4Zm-4-4v4h-4v5h-2v4h-5V9h3V6h-5V0h13Zm-11 13v3h-2v-3h2Zm-4-13v6h-2v4h2v4h-2v2h2v4h-4V0h4Zm-6 4V0h-2v4h2Zm-1 6V7h-4V4h-2V0h-2v4h-2V0H86v4h-2v3h-2v2h-2v4h6v3h-2v4h6v-4h-2v-3h-2V9h-2V7h4V4h3v9h2v7h7v-4h-5v-3h-2V9h2V7h3v3h2v4h6v-4ZM74 7v3h-2v2h2v8h-4V0h8v5h-3V4h-3v3h2Zm28 13h4v-4h-4v4Zm28-6v-4h-2v6h2v4h2v-6h-2Zm9 2v-6h-2v6h-2v4h4v-4Zm-12 4v-4h-4v4h4ZM0 20h2V0H0v20Zm4 0h4V0H4v20Zm6 0h2V0h-2v20Zm5 0h7V0h-7v20Zm12 0h-3V0h3v20Zm5 0h3v-4h5v-6h-5V6h7V3h3V0h-7v3h-3V0h-3v20ZM52 3v3h-3v3h-4V6h1V3h6Zm23 13h6v4h-6v-4Zm-29-6v3h3v-3h3v3h-2v6h-3v-3h-2v-3h-2v-3h3Zm8 6v3h-2v-3h2Zm3 0v3h2v-3h2v-3h-2v3h-2Zm0 0v-6h-3v6h3Zm4-7V6h2V0h-2v6h-2v3h2Zm5-3v3h-2V6h2Zm2 0h-2V3h2v3Zm-9-3V0h-2v3h2Z"
      />
    </svg>
  );
}
