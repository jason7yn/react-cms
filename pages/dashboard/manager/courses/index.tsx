import AppLayout from "../../../../component/Layout/layout";
import { CourseCard } from "../../../../component/courses/courseCard";
import { List, Spin, BackTop } from "antd";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import apiService from "../../../../services/api-service";
import { CourseData } from "../../../../services/models/courses";

export default function Course(): JSX.Element {
  const [loading, setLoading] = useState<Boolean>(false);
  const [data, setData] = useState<CourseData[]>([]);
  const [page, setPage] = useState<Number>(1);
  const [total, setTotal] = useState<Number>(0);

  const loadMoreData = useCallback(() => {
    if (loading) {
      return;
    }
    setLoading(true);
    apiService
      .getCourse({ page: page, limit: 20 })
      .then((res) => {
        setData([...data, ...res.data.courses]);
        setPage(page + 1);
        setTotal(res.data.total);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [page, data, loading]);
  useEffect(() => {
    loadMoreData();
  }, []); //has caused infinite loop here if dependency is set to loadmoredata

  return (
    <AppLayout>
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < total}
        loader={<Spin size="large" spinning={!loading} />}
        endMessage="No More Course!"
        scrollableTarget="contentLayout"
      >
        <List
          dataSource={data}
          grid={{
            column: 4,
            gutter: 14,
            xs: 1,
            sm: 2,
            md: 2,
          }}
          renderItem={(item: CourseData) => {
            return (
              <List.Item key={item.id}>
                <CourseCard {...item} />
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>

      <BackTop visibilityHeight={200} target={() => contentLayout}>
        <VerticalAlignTopOutlined className="back-to-top" />
      </BackTop>
    </AppLayout>
  );
}
