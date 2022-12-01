const XLSX = require('xlsx');
const { resolve } = require('path');
function createWorkbook (wsname, data, res) {
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'Usuarios Activos');
    XLSX.writeFile(workBook, `src/dashboarduploads/${wsname}.xlsx`);
    res.download(resolve(`src/dashboarduploads/${wsname}.xlsx`));
}

module.exports = createWorkbook




// let xl = require('excel4node');
// function createWorkbook (wsname, data, res) {
//     let wb = new xl.Workbook();
//     let headerStyle = wb.createStyle({
//         alignment: { // §18.8.1
//             horizontal: 'center',
//             vertical: 'center'
//         },
//         font: {
//             color: '000000',
//             size: 12,
//             bold: true,
//         },
//         numberFormat: '$#,##0.00; ($#,##0.00); -',
//     });
//     let ws = wb.addWorksheet('Usuarios Activos');
//     ws.cell(1, 1).string('grado').style(headerStyle);
//     ws.cell(1, 2).string('apellido').style(headerStyle);
//     ws.cell(1, 3).string('nombre').style(headerStyle);
//     ws.cell(1, 4).string('tipo identification').style(headerStyle);
//     ws.cell(1, 5).string('identification').style(headerStyle);
//     ws.cell(1, 6).string('apellidos padre').style(headerStyle);
//     ws.cell(1, 7).string('nombres padre').style(headerStyle);
//     ws.cell(1, 8).string('tipo identification padre').style(headerStyle);
//     ws.cell(1, 9).string('identification padre').style(headerStyle);
//     ws.cell(1, 10).string('direccion padre').style(headerStyle);
//     ws.cell(1, 11).string('telefono padre').style(headerStyle);
//     ws.cell(1, 12).string('email padre').style(headerStyle);
//     ws.cell(1, 13).string('ciudad residencia padre').style(headerStyle);
//     ws.cell(1, 14).string('apellidos madre').style(headerStyle);
//     ws.cell(1, 15).string('nombres madre').style(headerStyle);
//     ws.cell(1, 16).string('tipo identification madre').style(headerStyle);
//     ws.cell(1, 17).string('identification madre').style(headerStyle);
//     ws.cell(1, 18).string('direccion madre').style(headerStyle);
//     ws.cell(1, 19).string('telefono madre').style(headerStyle);
//     ws.cell(1, 20).string('email madre').style(headerStyle);
//     ws.cell(1, 21).string('ciudad residencia madre').style(headerStyle);
//     ws.cell(1, 22).string('apellidos acudiente').style(headerStyle);
//     ws.cell(1, 23).string('nombres acudiente').style(headerStyle);
//     ws.cell(1, 24).string('tipo identification acudiente').style(headerStyle);
//     ws.cell(1, 25).string('identification acudiente').style(headerStyle);
//     ws.cell(1, 26).string('direccion acudiente').style(headerStyle);
//     ws.cell(1, 27).string('telefono acudiente').style(headerStyle);
//     ws.cell(1, 28).string('email acudiente').style(headerStyle);
//     ws.cell(1, 29).string('ciudad residencia acudiente').style(headerStyle);
//     ws.cell(1, 30).string('valor anual').style(headerStyle);
//     ws.cell(1, 31).string('valor anual texto').style(headerStyle);
//     ws.cell(1, 32).string('valor matricula').style(headerStyle);
//     ws.cell(1, 33).string('texto valor matricula').style(headerStyle);
//     ws.cell(1, 34).string('valor total pension').style(headerStyle);
//     ws.cell(1, 35).string('texto valor total pension').style(headerStyle);
//     ws.cell(1, 36).string('pension').style(headerStyle);
//     ws.cell(1, 37).string('texto pension').style(headerStyle);
//     ws.cell(1, 38).string('otros costos').style(headerStyle);
//     ws.cell(1, 39).string('texto otros costos').style(headerStyle);
//     data.forEach((value, index) => {
//         let row = index + 2;
//         ws.cell(row, 1).string(`${value.grade}`);
//         ws.cell(row, 2).string(`${value.surname}`);
//         ws.cell(row, 3).string(`${value.name}`);
//         ws.cell(row, 4).string(`${value.identification.type}`);
//         ws.cell(row, 5).string(`${value.identification.id}`);
//         ws.cell(row, 6).string(`${value.parents.father.surname || ''}`);
//         ws.cell(row, 7).string(`${value.parents.father.name || ''}`);
//         ws.cell(row, 8).string(`${value.parents.father.identification.type || ''}`);
//         ws.cell(row, 9).string(`${value.parents.father.identification.id || ''}`);
//         ws.cell(row, 10).string(`${value.parents.father.location.address || ''}`);
//         ws.cell(row, 11).string(`${value.parents.father.phone || ''}`);
//         ws.cell(row, 12).string(`${value.parents.father.email || ''}`);
//         ws.cell(row, 13).string(`${value.parents.father.location.city || ''}`);
//         ws.cell(row, 14).string(`${value.parents.mother.surname || ''}`);
//         ws.cell(row, 15).string(`${value.parents.mother.name || ''}`);
//         ws.cell(row, 16).string(`${value.parents.mother.identification.type || ''}`);
//         ws.cell(row, 17).string(`${value.parents.mother.identification.id || ''}`);
//         ws.cell(row, 18).string(`${value.parents.mother.location.address || ''}`);
//         ws.cell(row, 19).string(`${value.parents.mother.phone || ''}`);
//         ws.cell(row, 20).string(`${value.parents.mother.email || ''}`);
//         ws.cell(row, 21).string(`${value.parents.mother.location.city || ''}`);
//         ws.cell(row, 22).string(`${value.relative.surname || ''}`);
//         ws.cell(row, 23).string(`${value.relative.name || ''}`);
//         ws.cell(row, 24).string(`${value.relative.identification.type || ''}`);
//         ws.cell(row, 25).string(`${value.relative.identification.id || ''}`);
//         ws.cell(row, 26).string(`${value.relative.location.address || ''}`);
//         ws.cell(row, 27).string(`${value.relative.phone || ''}`);
//         ws.cell(row, 28).string(`${value.relative.email || ''}`);
//         ws.cell(row, 29).string(`${value.relative.location.city || ''}`);
//         ws.cell(row, 30).string(`${value.annualAmount || ''}`);
//         ws.cell(row, 31).string(`${value.annualAmountText || ''}`);
//         ws.cell(row, 32).string(`${value.enrollmentAmount || ''}`);
//         ws.cell(row, 33).string(`${value.enrollmentAmountText || ''}`);
//         ws.cell(row, 34).string(`${value.remainingAmount || ''}`);
//         ws.cell(row, 35).string(`${value.remainingAmountText || ''}`);
//         ws.cell(row, 36).string(`${value.pension || ''}`);
//         ws.cell(row, 37).string(`${value.pensionText || ''}`);
//         ws.cell(row, 38).string(`${value.annualAmount || ''}`);
//         ws.cell(row, 39).string(`${value.anotherAmountText || ''}`);
//     })
//     wb.write(`${wsname}.xlsx`, res);
// }
// module.exports = createWorkbook