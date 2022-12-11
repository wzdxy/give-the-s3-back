# Windows Vendors, Give The S3 Sleep Mode Back!

### [give-the-s3-back.com](https://give-the-s3-back.com)

This project is used to sort out the support of laptops produced by various manufacturers for S3 sleep mode and display it on the website as a reference for consumers when purchasing laptops.

本项目用于整理各厂商生产的笔记本电脑对 S3 睡眠模式的支持情况，并在网站中展示，作为消费者选购笔记本电脑时的参考。

## Add Your Devices / 添加你的笔记本电脑

Find the folder with the vendor name of the laptop you are using in the vendors directory, and create a json5 file named after the model in the folder.

在 vendors 目录下找到你使用的笔记本的厂商名字的文件夹，在文件夹中创建以型号命名的 json5 文件.

json5 file writing rules can be referred to [xps-15-9570.json5](vendors/dell/xps-15-9570.json5)

json5 文件的编写规则可以参考 [xps-15-9570.json5](vendors/dell/xps-15-9570.json5)

## Add More Vendors / 添加更多笔记本厂商

If the vendor folder you want to add does not exist, create a folder in the `vendors` directory. Use lower case letters.

如果你要添加的厂商文件夹还不存在，在 vendors 目录下创建一个文件夹，使用小写字母。

## Website Dev / 参与网站开发

dev with `react` and `next.js`

```bash
cd website
npm i
npm run dev
```