import { useQuery } from '@tanstack/react-query';
import { getPostList, getUsers } from '../api/postsApi';
import { Link } from 'react-router-dom';

export default function PostList() {
  const { data: postlist, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: getPostList,
    staleTime: Infinity,
  });

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    staleTime: Infinity,
  });

  // users_ids를 키로 빠르게 접근하기 위한 map 생성
  const userMap =
    users &&
    new Object(Object.fromEntries(users.map((user) => [user.id, user])));

  // 각 post에 user 정보 추가
  const posts =
    postlist &&
    postlist.map((post) => ({
      ...post,
      user: userMap?.[post.userId],
    }));

  if (isLoading) return <div className="space-y-4">...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Post List</h1>
      {posts &&
        posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="block p-4 bg-white shadow rounded-md hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-4">
              {/* post.user가 로드되기 전을 대비한 방어 코드 추가 */}
              <img
                src={`https://i.pravatar.cc/40?u=${post.user?.id}`}
                alt={post.user?.name}
                className="rounded-full"
                width={40}
                height={40}
              />
              <div>
                <h2 className="text-lg font-semibold">{post.title}</h2>
                <h3 className="text-sm text-gray-700">{post.user?.name}</h3>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}