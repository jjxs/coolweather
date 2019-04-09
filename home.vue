<template>
    <div class="wrapper">
        <v-head></v-head>
        <!--<v-sidebar></v-sidebar>-->
        <div class="sidebar" ref="sidebars">
            <div class="ShowHide">
                <a v-model="isCollapse" @click="ShowHide()" ref="arrowsBtn">
                    <img src="@/assets/images/menu.png" alt="">
                </a>
            </div>
            <el-menu
                    class="el-menu-vertical-demo"
                    :default-active="defaultActive"
                    :default-openeds="openeds"
                    :collapse="isCollapse"
                    unique-opened
                    router
                    @open="handleOpen"
                    @close="handleClose">
                <template v-for="item in items">
                    <template v-if="item.subs">
                        <el-submenu :index="item.index">
                            <template slot="title">
                                <i :class="item.icon"></i>
                                <span>{{ item.title }}</span>
                            </template>
                            <el-menu-item
                                    v-for="(subItem,i) in item.subs"
                                    :key="i"
                                    :index="subItem.index"
                                    @click="handleOpenClick(subItem.index)">
                                {{ subItem.title }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                    <template v-else>
                        <el-menu-item :index="item.index">
                            <i :class="item.icon"></i>
                            <span>{{ item.title }}</span>
                        </el-menu-item>
                    </template>
                </template>
            </el-menu>
        </div>
        <div class="content" ref="contents">
            <transition name="move" mode="out-in">
                <router-view :key="$route.path"></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue';
    // import vSidebar from './Sidebar.vue';

    export default {
        name: 'Home',
        components: {
            //, vSidebar
            vHead
        },
        data() {
            return {
                isCollapse: false,
                //展开的默认状态
                openeds: [],
                //焦点的默认状态
                defaultActive: '',
                items: [
                    {
                        icon: 'el-icon-menu',
                        index: 'readme',
                        title: 'Home',
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '0',
                        title: 'PST',
                        subs: [
                            {
                                index: 'pstHome',
                                title: 'チケット履歴'
                            },
                            {
                                index: 'pstRequestType',
                                title: 'パラメータ依頼'
                            },
                            {
                                index: 'historySearch',
                                title: 'パラメータ変更検索'
                            },
                            {
                                index: 'parameterList',
                                title: 'パラメータ一覧'
                            },
                            {
                                index: 'parameterSearch',
                                title: 'パラメータ検索'
                            },
                            // TODO 注释管理
                            // {
                            //    index: 'systemManagerList',
                            //    title: 'システム管理',
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '1',
                        title: 'MST',
                        subs: [
                            {
                                index: 'mstDesc',
                                title: 'メニュー概要'
                            },
                            {
                                index: 'mstChangeHistory',
                                title: 'メニュー変更履歴'
                            },
                            {
                                index: 'mstMenuTreeSpecInfo',
                                title: 'メニューツリー'
                            },
                            {
                                index: 'mstSearch',
                                title: 'メニュー検索'
                            },
                            {
                                index: 'mstMenuTreeSrcInfo',
                                title: 'メニュー実装'
                            },
                            {
                                index: 'mstReleaseManage',
                                title: 'リリース管理'
                            },
                            {
                                index: 'mstFileManage',
                                title: 'ファイル管理'
                            },
                            // {
                            //     index: 'mstSystemManage',
                            //     title: 'システム管理'
                            // }
                        ]
                    },
                    {
                        icon: 'el-icon-menu',
                        index: '2',
                        title: 'SST',
                        subs: [
                            {
                                index: 'sstDesc',
                                title: 'ステータス概要'
                            },
                            {
                                index: 'sstChangeHistory',
                                title: 'ステータス変更履歴'
                            },
                            {
                                index: 'sstStatusSpecInfo',
                                title: 'ステータス一覧'
                            },
                            {
                                index: 'sstSearch',
                                title: 'ステータス検索'
                            },
                            {
                                index: 'sstStatusSourceCodeInfo',
                                title: 'ステータス実装'
                            },
                            {
                                index: 'sstReleaseTicketInfo',
                                title: 'リリース管理'
                            },
                            {
                                index: 'sstFileManage',
                                title: 'ファイル管理'
                            },
                            // {
                            //     index: 'sstSystemManage',
                            //     title: 'システム管理'
                            // },
                            // {
                            //     index: 'sstSplit',
                            //     title: 'ステータス＿編集者変更 _split'
                            // }
                        ]
                    }
                ]
            }
        },
        computed: {
            // onRoutes() {
            //     return this.$route.path.replace('/', '');
            // }
        },
        methods: {

            handleShowHide() {
                console.log(this.items[1].subs[5].display);

            },


            /**
             * 展开收起效果
             */
            handleOpen(key, keyPath) {
                sessionStorage.setItem("selected-sub-sytemId", key);
            },
            handleClose(key, keyPath) {
                this.openeds = [''];
                sessionStorage.setItem("selected-sub-sytemId", this.openeds);
            },
            //焦点的点击事件
            handleOpenClick(index) {
                sessionStorage.setItem("focus-page-name", index);
            },

            ShowHide() {

                if (this.isCollapse) {
                    this.isCollapse = false;
                    this.$refs.arrowsBtn.style.marginLeft = '217px';
                    this.$refs.contents.style.left = '250px';

                } else {
                    this.isCollapse = true;
                    this.$refs.contents.style.left = '64px';
                    this.$refs.arrowsBtn.style.marginLeft = '15px';
                }
                console.log(this.$refs.arrowsBtn.style.width)
            },
            //首页点击判断路径及保存展开效果及保存焦点效果
            getPath() {
                if (this.$route.path === '/grocer/pstHome') {
                    this.openeds = ['0'];
                    sessionStorage.setItem("selected-sub-sytemId", this.openeds);
                    this.defaultActive = 'pstHome';
                    sessionStorage.setItem("focus-page-name", this.defaultActive);
                } else if (this.$route.path === '/grocer/mstDesc') {
                    this.openeds = ['1'];
                    sessionStorage.setItem("selected-sub-sytemId", this.openeds);
                    this.defaultActive = 'mstDesc';
                    sessionStorage.setItem("focus-page-name", this.defaultActive);
                } else if (this.$route.path === '/grocer/sstDesc') {
                    this.openeds = ['2'];
                    sessionStorage.setItem("selected-sub-sytemId", this.openeds);
                    this.defaultActive = 'sstDesc';
                    sessionStorage.setItem("focus-page-name", this.defaultActive);
                } else if (this.$route.path === '/grocer/readme') {
                    this.defaultActive = 'readme';
                    sessionStorage.setItem("focus-page-name", this.defaultActive);
                }
            }
        },
        //监听路径优化
        watch: {
            '$route': 'getPath',
        },
        mounted() {
            //页面刷新保持展开效果
            this.openeds = [sessionStorage.getItem("selected-sub-sytemId")];
            //页面刷新保存焦点效果
            this.defaultActive = sessionStorage.getItem("focus-page-name");

            let groups = this.$localStorage.getItem('account_user').groups;
            for (let i = 0; i < groups.length; i++) {
                if (groups[i].name == 'Parameter Team Member') {
                    // this.items[1].subs.pop();
                    let itemsSubs = {
                        index: 'systemManagerList',
                        title: 'システム管理',
                    };
                    this.items[1].subs.push(itemsSubs);
                }
            }
        }
    }
</script>

<style lang="scss">
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        /*width: 249px;*/
        width: calc(249px + 17px);
        /*min-height: 400px;*/
    }

    .sidebar {
        display: block;
        position: absolute;
        width: 249px;
        left: 0;
        top: 70px;
        bottom: 0;
        /*background: #2E363F;*/
        .ShowHide a {
            /*position: absolute;*/
            /*z-index: 1;*/
            /*top: 50%;*/
            /*left: 241px;*/
            /*border: 1px solid #dcdfe6;*/
            /*text-align: center;*/
            /*border-radius: 4px;*/
            /*transition: .1s;*/
            /*font-weight: 500;*/
            /*padding: 0;*/
            background: #fff;
            margin-left: 217px;
            cursor: pointer;
        }
    }

    .sidebar > ul {
        overflow-y: scroll;
        width: calc(249px + 17px);
        height: 90%;
    }

    .el-radio-button {
        &:first-child .el-radio-button__inner, &:last-child .el-radio-button__inner {
            padding: 13px 48px;
            border: none;
            -webkit-border-radius: inherit;
            -moz-border-radius: inherit;
            border-radius: inherit;
        }

        &:last-child .el-radio-button__inner {
            padding: 13px 48px 13px 49px;
            /*border-right: solid 1px #e6e6e6;*/
        }
    }

    .el-radio-button__orig-radio:checked + .el-radio-button__inner {

    }

</style>
