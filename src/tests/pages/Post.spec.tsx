import { render, screen } from '@testing-library/react';
import { getPrismicClient } from '../../services/prismic';
import { mocked } from 'ts-jest/utils';
import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getSession } from 'next-auth/client';

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post excerpt</p>',
  updatedAt: 'Any day'
};

jest.mock('../../services/prismic');
jest.mock('next-auth/client');

describe('Post page', () => {
  it('renders correctly', () => {
    render(
      <Post
        post={post}
      />
    )

    expect(screen.getByText('My New Post')).toBeInTheDocument();
    expect(screen.getByText('Post excerpt')).toBeInTheDocument();
  });

  it('redirects user if no subscription found', async () => {
    const getSessionMocked = mocked(getSession)
    getSessionMocked.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/',
        })
      })
    )
  });

  it('loads initial data', async () => {
    const getSessionMocked = mocked(getSession);
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My New Post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content' }
          ],
        },
        last_publication_date: '04-01-2021',
      })
    } as any)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    } as any);

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post content</p>',
            updatedAt: '01 de abril de 2021'
          }
        }
      })
    )
  });
})