import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Layout from '@theme/Layout'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <div className='hero hero--dark'>
      <div className='container'>
        <h1 className='hero__title'>Hi, my name is Campbell Rehu</h1>
        <p className='hero__subtitle'>Welcome to my digital garden</p>
        <div>
          <p>
            This is where I am attempting to learn in public and get better at
            writing in a concise and cohesive way.
          </p>
        </div>
        <div className='container'>
          <div className='row'>
            <a
              className='button button--primary button--lg margin-right--sm'
              style={{ width: '200px' }}
              href='/docs/intro'>
              Docs
            </a>
            <a
              className='button button--primary button--lg margin-right--sm'
              href='https://github.com/campbell-rehu'
              style={{ width: '200px' }}
              target='_blank'
              rel='noopener noreferrer nofollow'>
              <img
                src='/img/github-mark-white.png'
                width='20px'
                className='margin-right--sm'
                style={{ verticalAlign: 'text-top' }}
              />
              GitHub
            </a>
            <a
              className='button button--primary button--lg'
              href='https://gitlab.com/campbellrehu'
              style={{ width: '200px' }}
              target='_blank'
              rel='noopener noreferrer nofollow'>
              <img
                src='/img/gitlab-logo.png'
                width='20px'
                className='margin-right--sm'
                style={{ verticalAlign: 'text-top' }}
              />
              GitLab
            </a>
          </div>
          {/* <div className='row'>
            <a
              className='button button--primary button--lg'
              style={{ width: '200px' }}
              href='/docs/intro'>
              Docs
            </a>
          </div>
          <div className='row margin-top--md'>
            <a
              className='button button--primary button--lg'
              href='https://github.com/campbell-rehu'
              style={{ width: '200px' }}
              target='_blank'
              rel='noopener noreferrer nofollow'>
              <img
                src='/img/github-mark-white.png'
                width='20px'
                className='margin-right--sm'
                style={{ verticalAlign: 'text-top' }}
              />
              GitHub
            </a>
          </div>
          <div className='row margin-top--md'>
            <a
              className='button button--primary button--lg'
              href='https://gitlab.com/campbellrehu'
              style={{ width: '200px' }}
              target='_blank'
              rel='noopener noreferrer nofollow'>
              <img
                src='/img/gitlab-logo.png'
                width='20px'
                className='margin-right--sm'
                style={{ verticalAlign: 'text-top' }}
              />
              GitLab
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout title={`Hello from ${siteConfig.title}`}>
      <HomepageHeader />
    </Layout>
  )
}
