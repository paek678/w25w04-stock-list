import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import {
  getPostById,
  getCommentsByPostId,
  getUserById,
} from '../api/postsApi';

export default function PostDetail() {
  const { id } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPostById(id),
    staleTime: Infinity,
  });

  const { data: comments } = useQuery({
    queryKey: ['comments', id],
    queryFn: () => getCommentsByPostId(id),
    staleTime: Infinity,
    enabled: !!post, // post 데이터가 있을 때만 이 쿼리 실행
  });

  const { data: user } = useQuery({
    queryKey: ['user', post?.userId],
    queryFn: () => getUserById(post?.userId),
    staleTime: Infinity,
    enabled: !!post, // post 데이터가 있고 userId가 있을 때만 실행
  });

  // 데이터 로딩 중이거나, 필수 데이터가 아직 없을 때 로딩 표시
  if (isLoading || !post || !comments || !user) {
    return <div>loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-block px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
      >
        뒤로가기
      </Link>
      <div className="bg-white p-6 shadow rounded-md">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={`https://i.pravatar.cc/60?u=${user.id ? `u=${user.id}` : ''}`}
            alt={user.name}
            className="rounded-full"
            width={60}
            height={60}
          />
          <div>
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p className="text-gray-600">작성자: {user.name}</p>
          </div>
        </div>
        <div className="text-gray-800">
          <p>{post.body}</p>
        </div>
      </div>
      <div className="bg-white p-6 shadow rounded-md">
        <h3 className="text-lg font-semibold mb-2">
          {comments.length}개의 댓글
        </h3>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="p-4 bg-gray-50 rounded shadow-sm">
              <p className="font-semibold">{comment.name}</p>
              <p className="text-sm text-gray-600">{comment.email}</p>
              <p className="text-sm text-gray-800 mt-2">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}