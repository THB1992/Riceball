var utils = require(Editor.url('packages://pngquant/utils/utils'));
var child_process = require("child_process");
const os = require('os');

Editor.Panel.extend({
    // css style for panel
    style: `

  `,

    // html template for panel
    template: `
    <head>
      <hr/>
      <ui-prop name="${Editor.T('pngquant.proj')}">
          <ui-select id="proj" v-on:confirm="selectProject">
            <option value="wechatgame">wechatgame</option>
            <option value="qqplay">qqplay</option>
            <option value="web-mobile">web-mobile</option>
            <option value="web-desktop">web-desktop</option>
            <option value="jsb-default">jsb-default</option>
            <option value="jsb-binary">jsb-binary</option>
            <option value="jsb-link">jsb-link</option>
          </ui-select>
          <ui-button id="start" v-on:confirm="startCompression">${Editor.T('pngquant.start')}</ui-button>
      </ui-prop>
      <ui-prop name="${Editor.T('pngquant.progress')}">
          <ui-progress style="width: 90%;" v-value="progress">0</ui-progress>
      </ui-prop>
      <hr/>
        <div style="overflow:scroll;height:100%">
            <div v-for="item of list" id="item">
                <div class="info">
                    <img src="" v-bind:src="item.path" alt="" width="50" height="50">
                    <span>
                        {{item.name}}
                    </span>
                    <span>
                      {{item.before_size}}B
                    </span
                </div>
            </div>a
        </div>
    </head>
  `,

    dependencies: [
        'packages://pngquant/lib/jquery.min.js',
        "packages://pngquant/lib/vendor.bundle.js",
    ],

    // element and variable binding
    $: {

    },

    // method executed when template and styles are successfully loaded and initialized
    ready() {

        this.vue = new window.Vue({
            el: this.shadowRoot,

            data: {
                list: [],
                project: 'wechatgame',
                progress: 0,
            },

            methods: {
                selectProject(event) {
                    this.list = [];
                    Editor.log('pngquant target:' + event.target.value);
                    this.project = event.target.value;
                },

                startCompression() {
                    if (utils.checkIsExistProject(this.project)) {
                        this.list = utils.loadPngFiles();
                        this.compressionPng();
                    } else {
                        this.onCompressFinish();
                    }
                },

                compressionPng() {
                    let self = this;
                    Editor.log("pngquant start!");

                    let index = 0;
                    let pngquant_path = (os.platform().indexOf('win32') >= 0 || os.platform().indexOf('win64') >= 0) ? Editor.url('packages://pngquant/tool/windows/pngquant.exe') : Editor.url('packages://pngquant/tool/mac/pngquant');
                    let cmd = pngquant_path + " --transbug --quality=70-70 --force 256 --ext .png";

                    let item = this.list[index];
                    let exe_cmd = cmd + ' ' + item.path;
                    // Editor.log("pngquant : " + item.path);

                    self.progress = 0;

                    function exec() {
                        child_process.exec(exe_cmd, {
                            timeout: 3654321
                        }, function (error, stdout, stderr) {
                            if (stderr) {
                                Editor.error("pngquant error : " + stderr);
                                //return;
                            }
                            if (index < self.list.length - 1) {

                                index++;
                                item = self.list[index];
                                exe_cmd = cmd + ' ' + item.path;
                                // Editor.log("pngquant : " + item.path);
                                self.progress = parseInt(index / self.list.length * 100);
                                exec();
                            } else {
                                Editor.log("pngquant finished!");
                                self.progress = 100;
                                self.onCompressFinish();
                            }
                        });
                    }
                    exec();
                },

                onCompressFinish() {
                    Editor.Ipc.sendToMain('build-pipeline:onCompressFinish', null, null);
                }
            }
        })
    },

    // register your ipc messages here
    messages: {
        'pngquant:startCompress'(event, project) {
            if (project.toLowerCase() == 'android' || project.toLowerCase() == 'ios') {
                project = 'jsb-link';
            }
            Editor.log('project:' + project);
            this.vue.project = project;
            this.vue.startCompression();
        },

    }
});