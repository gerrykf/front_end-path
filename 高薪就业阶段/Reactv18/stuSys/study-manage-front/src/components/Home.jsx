function Home() {
  return (
    <div className="jumbotron">
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>姓名</th>
              <th>年龄</th>
              <th>性别</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>张三</td>
              <td>18</td>
              <td>男</td>
              <td>
                <a href="#">删除</a>
              </td>
            </tr>
            <tr>
              <td>李四</td>
              <td>22</td>
              <td>女</td>
              <td>
                <a href="#">删除</a>
              </td>
            </tr>
            <tr>
              <td>王五</td>
              <td>21</td>
              <td>男</td>
              <td>
                <a href="#">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
