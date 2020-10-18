import React, { useState, useEffect } from "react";
import axios from "axios";

function Human() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
    const fetchUsers = async () => {
      try {
        //성공할떄
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setUsers(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        //console.log(response.data);
        setUsers(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        //실패할떄
        setError(e);
      } //성공, 실패 여부와 관계없이 완료하고 마지막 동작을 취하고 싶을때
      setLoading(false);
    };

    useEffect(() => {
      fetchUsers();
    }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} ({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
}

export default Human;
