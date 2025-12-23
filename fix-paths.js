const fs = require('fs');
const path = require('path');

// Функция для рекурсивного поиска файлов
function getAllFiles(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(file => {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
        }
    });

    return arrayOfFiles;
}

// Функция замены путей
function fixPaths(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Список замен
        const replacements = [
            { search: /src="\//g, replace: 'src="' },
            { search: /url\('\//g, replace: 'url(\'../' },
            { search: /href="\//g, replace: 'href="' },
            { search: /src="\/css\//g, replace: 'src="css/' },
            { search: /src="\/js\//g, replace: 'src="js/' },
            { search: /src="\/img\//g, replace: 'src="img/' },
            { search: /url\("\/img\//g, replace: 'url("../img/' },
            { search: /background-image: url\("\/img\//g, replace: 'background-image: url("../img/' }
        ];

        // Применяем все замены
        replacements.forEach(replacement => {
            content = content.replace(replacement.search, replacement.replace);
        });

        // Сохраняем изменения
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Исправлено: ${filePath}`);
    } catch (error) {
        console.log(`❌ Ошибка в файле ${filePath}: ${error.message}`);
    }
}

// Основной код
const files = getAllFiles('.', []);
const extensions = ['.html', '.css', '.js'];

// Фильтруем только нужные файлы
const targetFiles = files.filter(file => 
    extensions.some(ext => file.endsWith(ext))
);

console.log(`🔍 Найдено файлов для обработки: ${targetFiles.length}`);
console.log('🚀 Начинаем автоматическое исправление путей...\n');

// Обрабатываем каждый файл
targetFiles.forEach(fixPaths);

console.log('\n🎉 Все пути успешно исправлены!');
console.log('✅ Теперь можно загружать файлы в GitHub');
