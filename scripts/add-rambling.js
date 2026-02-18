#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 获取命令行参数
const args = process.argv.slice(2);

if (args.length < 3) {
  console.log('Usage: node add-rambling.js <type> <args...>');
  console.log('');
  console.log('Type: snippet or blog');
  console.log('');
  console.log('Snippet:');
  console.log('  node add-rambling.js snippet "content" "tag" [date]');
  console.log('  Example: node add-rambling.js snippet "English text" "AI" "2025-09-21"');
  console.log('');
  console.log('Blog:');
  console.log('  node add-rambling.js blog "title" "summary" "filename.md" "tag" [date]');
  console.log('  Example: node add-rambling.js blog "EN Title" "EN summary" "my-blog.md" "AI" "2025-09-21"');
  process.exit(1);
}

const type = args[0];

if (type !== 'snippet' && type !== 'blog') {
  console.error('❌ Error: Type must be either "snippet" or "blog"');
  process.exit(1);
}

let newEntry;

if (type === 'snippet') {
  const content = args[1];
  const tag = args[2];
  const date = args[3] || new Date().toISOString().split('T')[0];

  newEntry = {
    type: 'snippet',
    date,
    content,
    tag
  };
} else if (type === 'blog') {
  if (args.length < 5) {
    console.error('❌ Error: Blog type requires title, summary, filename, and tag');
    process.exit(1);
  }

  const title = args[1];
  const summary = args[2];
  const filename = args[3];
  const tag = args[4];
  const date = args[5] || new Date().toISOString().split('T')[0];

  // Verify the markdown file exists
  const blogFilePath = path.join(__dirname, '../src/content/blogs', filename);
  if (!fs.existsSync(blogFilePath)) {
    console.error(`❌ Error: Blog file not found at src/content/blogs/${filename}`);
    console.error('Please create the markdown file first before adding the entry.');
    process.exit(1);
  }

  newEntry = {
    type: 'blog',
    date,
    title,
    summary,
    file: filename,
    tag
  };
}

// 读取现有数据
const ramblingPath = path.join(__dirname, '../src/data/rambling.json');
const ramblingData = JSON.parse(fs.readFileSync(ramblingPath, 'utf8'));

// 添加到数组开头（最新的在前面）
ramblingData.unshift(newEntry);

// 写回文件
fs.writeFileSync(ramblingPath, JSON.stringify(ramblingData, null, 2));

console.log('✅ Rambling added successfully!');
console.log('📌 Type:', type);
if (type === 'snippet') {
  console.log('📝 Content:', newEntry.content);
} else {
  console.log('📝 Title:', newEntry.title);
  console.log('📄 Summary:', newEntry.summary);
  console.log('📁 File:', newEntry.file);
}
console.log('🏷️ Tag:', newEntry.tag);
console.log('📅 Date:', newEntry.date);
console.log('');
console.log('💡 Next steps:');
console.log('1. git add .');
console.log('2. git commit -m "Add new rambling"');
console.log('3. git push');
