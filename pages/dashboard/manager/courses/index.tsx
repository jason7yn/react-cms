import AppLayout from "../../../../component/Layout/layout";
import { CourseCard } from "../../../../component/courses/courseCard";
import { List, Spin } from 'antd'
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import apiService from "../../../../services/api-service";
import { CourseData } from "../../../../services/models/courses";

export default function Course() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0)

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    apiService.getCourse({ page: page, limit: 20 })
      .then((res) => {
        setData([...data, ...res.data.courses]);
        setPage((prevPage) => {
          return prevPage + 1;
        })
        setTotal(res.data.total)
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }
  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <AppLayout>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={<Spin size='large' spinning={!loading} />}
        endMessage='No More Course!'
        scrollableTarget='contentLayout'
      >
        <List
          dataSource={data}
          grid={{
            column: 4,
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 2
          }}
          renderItem={(item: CourseData) => {
            return (
              <List.Item key={item.id}>
                <CourseCard {...item} />
              </List.Item>
            );
          }
          }
        />
      </InfiniteScroll>
    </AppLayout>
  );
}
