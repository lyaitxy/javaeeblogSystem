<template>
  <div>
    <div class="footer">
      <div class="footer-container">
        <div class="copyright">
          <ul class="helpLink">
            <li>
              关于我们
              <span class="space"></span>
            </li>
            <li>
              联系我们
              <span class="space"></span>
            </li>
            <li>
              项目文档
              <span class="space"></span>
            </li>
            <li>
              项目地址
              <span class="space"></span>
            </li>
            <li>友情链接</li>
          </ul>
          <p>地址：中南林业科技大学</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.footer {
 
  .footer-container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 15px;

    .copyright {
      padding: 20px;

      .helpLink {
        text-align: center;

        li {
          display: inline;
          cursor: pointer;
          color: #999;
          &:hover {
            color: #1890ff;
          }
          .space {
            border-left: 1px solid #666;
            width: 1px;
            height: 13px;

            margin: 8px 10px;
          }
        }
      }

      p {
        margin: 10px 0;
        color: #999;
        text-align: center;
      }
    }
  }
}
</style>