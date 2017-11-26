let fs = require('fs');
let path = require('path');

let files = fs.readdirSync(path.join(__dirname, 'table'));

files.forEach(function (filename) {
    let module_name = filename.replace('.xlsx', '');
    let filepath = path.join(__dirname, 'table', filename);
    let rs = read_xlsx(filepath);
    console.log(rs)
});

//////////////////////////////////////////////////////////////////////////////////////////
// 读取Excel文件 && 整理成json格式 && 以表头为基准
//////////////////////////////////////////////////////////////////////////////////////////
function read_xlsx (filepath) {
    let xlsx = require('node-xlsx').default;
    let excel_file = xlsx.parse(filepath);
    let excel_file_sheet_1 = excel_file[0];
    let keys = excel_file_sheet_1.data[0];
    // console.log(excel_file_sheet_1.data);
    let results = [];
    for (let i = 1; i < excel_file_sheet_1.data.length; i++) {
        let row = excel_file_sheet_1.data[i];
        let cols = {};
        row.forEach((item, index) => {
            let key = keys[index];
            cols[key] = item;
        })
        results.push(cols);
    }
    return results;
}