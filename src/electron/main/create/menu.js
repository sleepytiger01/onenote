const {dialog, Menu, shell} = require('electron')
const menus = require('../menus');
const action = require('../action');

const mainTray = require('./tray')

function mainMenu() {

    const copyLocation = {
        label: global.p3x.onenote.lang.label.copyLocation,
        click: () => {
            global.p3x.onenote.window.onenote.webContents.send('p3x-onenote-action', {
                action: 'get-location'
            })
        }
    }

    const minimizationBehaviorLabel = !global.p3x.onenote.disableHide ? global.p3x.onenote.lang.label.disableHide.no : global.p3x.onenote.lang.label.disableHide.yes

    const template = [
        {
            label: global.p3x.onenote.title,
            submenu: menus.default(),
        },
        {
            label: p3x.onenote.lang.menu.action,
            submenu: [
                copyLocation,
            ]
        },
        {
            label: global.p3x.onenote.lang.label.settings,
            submenu: [
                {
                    label: minimizationBehaviorLabel,
                    click: () => {
                        global.p3x.onenote.disableHide = !global.p3x.onenote.disableHide;
                        global.p3x.onenote.conf.set('disable-hide', global.p3x.onenote.disableHide);

                        const message = global.p3x.onenote.disableHide ? global.p3x.onenote.lang.label.disableHide.message.yes : global.p3x.onenote.lang.label.disableHide.message.no

                        dialog.showMessageBox(global.p3x.onenote.window.onenote, {
                            type: 'info',
                            title: global.p3x.onenote.lang.dialog.minimizationBehavior.title,
                            message: message,
                            buttons: [global.p3x.onenote.lang.button.ok]
                        })
                        mainMenu()
                        mainTray()
                    }
                },
                {
                    label: global.p3x.onenote.lang.label.setProxy,
                    click: action.setProxy,
                }
            ],
        },
        {
            label: global.p3x.onenote.lang.label.edit,
            submenu: [
                copyLocation,
                {type: 'separator'},
                {
                    label: p3x.onenote.lang.menu.role.edit.undo,
                    role: 'undo'
                },
                {
                    label: p3x.onenote.lang.menu.role.edit.redo,
                    role: 'redo'
                },
                {type: 'separator'},
                {
                    label: p3x.onenote.lang.menu.role.edit.cut,
                    role: 'cut'
                },
                {
                    label: p3x.onenote.lang.menu.role.edit.copy,
                    role: 'copy'
                },
                {
                    label: p3x.onenote.lang.menu.role.edit.paste,
                    role: 'paste'
                },
                {
                    label: p3x.onenote.lang.menu.role.edit.pasteandmatchstyle,
                    role: 'pasteandmatchstyle'
                },
                {
                    label: p3x.onenote.lang.menu.role.edit.delete,
                    role: 'delete'
                },
                {
                    label: p3x.onenote.lang.menu.role.edit.selectall,
                    role: 'selectall'
                }
            ]
        },
        {
            label: global.p3x.onenote.lang.label.view,
            submenu: [
                {
                    label: p3x.onenote.lang.menu.role.view.reload,
                    role: 'reload'
                },
                {
                    label: p3x.onenote.lang.menu.role.view.forcereload,
                    role: 'forcereload'
                },
                {
                    label: p3x.onenote.lang.menu.role.view.toggledevtools,
                    role: 'toggledevtools'
                },
                {type: 'separator'},
                {
                    label: p3x.onenote.lang.menu.role.view.resetzoom,
                    role: 'resetzoom'
                },
                {
                    label: p3x.onenote.lang.menu.role.view.zoomin,
                    role: 'zoomin'
                },
                {
                    label: p3x.onenote.lang.menu.role.view.zoomout,
                    role: 'zoomout'
                },
                {type: 'separator'},
                {
                    label: p3x.onenote.lang.menu.role.view.togglefullscreen,
                    role: 'togglefullscreen'
                }
            ]
        },
        {
            label: global.p3x.onenote.lang.menu.help.title,
            role: 'help',
            submenu: [
                {
                    label: global.p3x.onenote.lang.label.download,
                    click: action.download
                },
                {
                    label: 'GitHub',
                    click: action.github
                },
                {
                    label: global.p3x.onenote.lang.label.developer,
                    click: action.patrik
                },
                {
                    label: 'P3X',
                    click: action.p3x
                },
                {
                    label: 'Corifeus',
                    click: action.corifeus
                },
                {
                    label: 'NPM',
                    click: action.npm
                },
            ]
        },
        {
            label: global.p3x.onenote.lang.label.donate,
            click: () => {
                shell.openExternal('https://paypal.me/patrikx3')
            }
        },
    ]

    if (process.env.APPIMAGE !== undefined) {
        template[5].submenu.push({type: 'separator'})
        template[5].submenu.push({
                label: global.p3x.onenote.lang.menu.help.checkUpdates,
                click: () => {
                    const {autoUpdater} = require("electron-updater");
                    autoUpdater.checkForUpdatesAndNotify();
                }
            },
        )
    }

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

module.exports = mainMenu;
