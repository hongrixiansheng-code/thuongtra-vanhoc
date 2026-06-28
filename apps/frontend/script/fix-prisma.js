const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'apps/frontend/src');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(srcDir);
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('new PrismaClient({') && content.includes('datasources:')) {
    // Regex to match the PrismaClient instantiation
    const regex = /const\s+prisma\s*=\s*new\s+PrismaClient\(\s*\{[\s\S]*?datasources\s*:\s*\{[\s\S]*?db\s*:\s*\{[\s\S]*?url\s*:\s*`file:\$\{dbPath\}`[\s\S]*?\}\s*\}\s*\}\s*\);?/g;
    
    // Some files might use process.cwd() etc for dbPath
    // Let's use a simpler replacement.
    content = content.replace(/const\s+dbPath\s*=[^;]+;/g, '');
    content = content.replace(/const\s+prisma\s*=\s*new\s+PrismaClient\(\s*\{[^}]*datasources[^}]*db[^}]*url[^}]*\}[^}]*\}[^}]*\}[^)]*\);?/g, 'const prisma = new PrismaClient();');
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
});
