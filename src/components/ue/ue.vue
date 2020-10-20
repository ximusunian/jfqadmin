<template>
  <div class="ueditor-content">
  <!-- <div class="container ueditor-content">
    <div :id=id class="edui_editor_wrp"></div>
  </div> -->
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script> 
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
        dialogFormVisible: false,
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
      insertContent: {
        type: String
      },
    },
    watch: {
      defaultMsg(val) {
        if(this.getUEContent() !== val) {
          this.editor.setContent(val);
        }
      },
      insertContent(val) {
				this.editor.focus();
        this.editor.execCommand('inserthtml', val);
      },
    },
    mounted() {
      const _this = this;
      
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        //延时 lkw20190307 添加, 防止页面加载富文本编辑器来不及赋值/或网络延时加载不上
        setTimeout(function () {
          _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
        }, 300);
      });
      console.log("上传这堆错误不用理会，上传接口需自行开发配置");
      
      this.editor.addListener("catchremotesuccess", function() {
        tips.success("内容已上传完成");
      });
      this.editor.addListener("catchremoteerror", function() {
        tips.error("远程图片抓取失败");
      });
      this.editor.ready(function() {
        var toolbars = _this.editor.ui.toolbars;
        document.getElementById(toolbars[0].id).classList.add('edui-toolbar-primary');
        // document.getElementById(toolbars[1].id).classList.add('edui-toobar-secondary');
        document.getElementById(_this.config.id + "_toolbarbox").classList.add('show-edui-more');
      });
      // 内容变化回调
      this.editor.addListener( 'contentChange', editor => {
        this._content = this.editor.getContent();
        this.$emit('changeContent', this._content);
      });
    },
    methods: {
      // 获取内容方法
      getUEContent() { 
        return this.editor.getContent()
      },
      // 获取纯文本内容方法
      getUEContentTxt() {
        return this.editor.getContentTxt()
      },
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>