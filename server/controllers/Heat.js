const Heat = require("../models/Heat")
const moment = require("moment")
const exceljs = require("exceljs")
exports.heatDetails = async (req, res) => {
  try {
    // console.log(req.body)
    const {
      inputDate,
      heatNo,
      meltingSupervisor: meltingSupervisor,
      mouldingSupervisor: mouldingSupervisor,
      pouringSupervisor: pouringSupervisor,
      coreSupervisor: coreSupervisor,
      shiftIncharge,
      furnaceNo,
      workerType,
      contractorName,
      sandIncharge,
      metalGrade,
      mouldingSection: mouldingSection,
      shiftNumber
    } = req.body
    // console.log(inputDate)
    const existingHeat = await Heat.findOne({ heatNo,inputDate })
    if (existingHeat) {
      return res.status(400).json({
        success: false,
        message: "Heat Number Already Exists",
      })
    }
    const date = new Date(inputDate)
    if (!moment(date, "DD-MM-YYYY", true).isValid()) {
      return res.status(500).json({
        success: false,
        message: "Invalid Date",
      })
    }


    // const meltingSupervisor=JSON.parse(_meltingSupervisor)
    // const mouldingSupervisor=JSON.parse(_mouldingSupervisor)
    // const coreSupervisor=JSON.parse(_coreSupervisor)
    // const pouringSupervisor=JSON.parse(_pouringSupervisor)
    // const mouldingSection=JSON.parse(_mouldingSection)
    const heat = await Heat.create({
      inputDate,
      heatNo,
      meltingSupervisor,
      mouldingSupervisor,
      pouringSupervisor,
      coreSupervisor,
      shiftIncharge,
      furnaceNo,
      workerType,
      contractorName,
      sandIncharge,
      metalGrade,
      mouldingSection,
      shiftNumber
    })
    return res.status(200).json({
      success: true,
      message: "Heat registered successfully",
      heat
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Heat cannot be registered. Please try again.",
    })
  }
}


exports.createDateExcel = async (req, res) => {
  try {
    const {
      inputDate
    } = req.query
    // inputDate="2023-10-12"
    // console.log(inputDate)
    const metGrade = ["VME", "NEW PLANT", "HAND MOULDING", "Old Pallete", "New Pallete"];
    const heat = await Heat.find({ inputDate }).populate([{
      path: "itemDescription"
    },
    {
      path: "logDetails"
    }]).exec()
    // console.log(heat.length)
    if (!heat || heat.length == 0) {
      return res.status(403).json({
        success: false,
        message: "No heats for this date"
      })
    }
    // console.log(heat)
    let exceldataupper = {}
    let exceldatalower = {}
    for (let heat_obj of heat) {
      if (heat_obj["workerType"] == "Company") {
        if (exceldatalower[`Company-${heat_obj['shiftNumber'].toUpperCase()}`]) {
          tempData = exceldatalower[`Company-${heat_obj['shiftNumber'].toUpperCase()}`]
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[mg] += 1
              tempData["total"] += 1
              break
            }
          }
        }
        else {
          tempData = {}
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[heat_obj['mouldingSection']] = 1
            }
            else {
              tempData[mg] = 0
            }
          }
          tempData['total'] = 1
          exceldatalower[`Company-${heat_obj['shiftNumber'].toUpperCase()}`] = tempData
        }
      }
      else {
        if (exceldatalower[`${heat_obj['contractorName'].toUpperCase()}-${heat_obj['shiftNumber'].toUpperCase()}`]) {
          tempData = exceldatalower[`${heat_obj['contractorName'].toUpperCase()}-${heat_obj['shiftNumber'].toUpperCase()}`]
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[mg] += 1
              tempData["total"] += 1
              break
            }
          }
        }
        else {
          tempData = {}
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[heat_obj['mouldingSection']] = 1
            }
            else {
              tempData[mg] = 0
            }
          }
          tempData['total'] = 1
          exceldatalower[`${heat_obj['contractorName'].toUpperCase()}-${heat_obj['shiftNumber'].toUpperCase()}`] = tempData
        }
      }
      for (let item of heat_obj['itemDescription']) {
        // console.log(item)
        if (heat_obj['workerType'] == 'Company') {
          if (!exceldataupper['Company']) {
            exceldataupper['Company'] = []
          }
          flag = 1
          for (let item_obj of exceldataupper["Company"]) {
            if (item_obj['itemName'] == item['itemName'] && item_obj['cavity'] == item['cavity']) {
              tempData = item_obj
              tempData['boxesMoulded'] += item['boxesMoulded']
              tempData['boxesPoured'] += item['boxesPoured']
              tempData['totalCasting'] += item['totalCasting']
              tempData['leftMoulded'] += item['boxesMoulded'] - item['boxesPoured']
              tempData['boxesleaked'] += item['boxesleaked']
              tempData['boxesdestroyed'] += item['boxesdestroyed']
              flag = 0
              break

            }
          }
          if (flag == 1) {
            tempData = {}
            tempData['itemName'] = item['itemName']
            tempData['cavity'] = item['cavity']
            tempData['metalGrade'] = heat_obj['metalGrade']
            tempData['boxesMoulded'] = item['boxesMoulded']
            tempData['boxesPoured'] = item['boxesPoured']
            tempData['totalCasting'] = item['totalCasting']
            tempData['leftMoulded'] = item['boxesMoulded'] - item['boxesPoured']
            tempData['boxesleaked'] = item['boxesleaked']
            tempData['boxesdestroyed'] = item['boxesdestroyed']

            exceldataupper['Company'].push(tempData)
          }


        }
        else {
          // console.log(item)
          if (!exceldataupper[heat_obj['contractorName']]) {
            exceldataupper[heat_obj['contractorName']] = []
          }
          flag = 1
          for (let item_obj of exceldataupper[heat_obj['contractorName']]) {
            if (item_obj['itemName'] == item['itemName'] && item_obj['cavity'] == item['cavity']) {
              // console.log(item_obj['itemName'])
              tempData = item_obj
              tempData['boxesMoulded'] += item['boxesMoulded']
              tempData['boxesPoured'] += item['boxesPoured']
              tempData['totalCasting'] += item['totalCasting']
              tempData['leftMoulded'] += item['boxesMoulded'] - item['boxesPoured']
              tempData['boxesleaked'] += item['boxesleaked']
              tempData['boxesdestroyed'] += item['boxesdestroyed']
              flag = 0
              break

            }
          }
          if (flag == 1) {
            // console.log(item['itemName'])
            tempData = {}
            tempData['itemName'] = item['itemName']
            tempData['cavity'] = item['cavity']
            tempData['metalGrade'] = heat_obj['metalGrade']
            tempData['boxesMoulded'] = item['boxesMoulded']
            tempData['boxesPoured'] = item['boxesPoured']
            tempData['totalCasting'] = item['totalCasting']
            tempData['leftMoulded'] = item['boxesMoulded'] - item['boxesPoured']
            tempData['boxesleaked'] = item['boxesleaked']
            tempData['boxesdestroyed'] = item['boxesdestroyed']

            exceldataupper[heat_obj['contractorName']].push(tempData)
          }
        }
      }
    }
    // return res.status(200).json({
    //   success: true,
    //   exceldataupper,
    //   exceldatalower
    // })  
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Day sheet");
    let row = 1

    const alignment = {
      horizontal: 'center', // Center horizontally
      vertical: 'middle'   // Center vertically
    };
    // headers=["Sr","Item Name","Metal Grade","Boxes Moulded","Boxes Poured","No Of Casting","Moulding Left","Leakage","Destroyed"]
    headers = {
      "Sr": "sr",
      "Item Name": "itemName",
      "Cavity": "cavity",
      "Metal Grade": "metalGrade",
      "Boxes Moulded": "boxesMoulded",
      "Boxes Poured": "boxesPoured",
      "No Of Castings": "totalCasting",
      "Moulding Left": "leftMoulded",
      "Leakage": "boxesleaked",
      "Destroyed": "boxesdestroyed"
    }
    for (wt in exceldataupper) {

      worksheet.mergeCells(`A${row}:J${row}`);
      worksheet.getCell(`A${row}`).alignment = alignment
      if (wt == "Company") {
        worksheet.getCell(`A${row}`).value = wt.toUpperCase();
      }
      else {
        worksheet.getCell(`A${row}`).value = "Contractor-" + wt.toUpperCase();
      }
      row += 1
      let col = 1
      let counter = 1
      for (header in headers) {
        worksheet.getCell(row, col++).value = header
      }
      row += 1
      for (items of exceldataupper[wt]) {
        col = 1
        // console.log(items)
        for (header in headers) {
          if (header == "Sr") {
            worksheet.getCell(row, col++).value = counter
          }
          else {
            worksheet.getCell(row, col++).value = items[headers[header]]
          }
        }
        counter++
        row++

      }

      row++

    }
    let totalHeat = 0
    let col = 4
    worksheet.getCell(row, 1).value = "Shift Number"
    worksheet.getCell(row, 2).value = "Worker Type"
    worksheet.getCell(row, 3).value = "Worker Name"
    for (header of metGrade) {
      worksheet.getCell(row, col++).value = header
    }
    worksheet.getCell(row, 9).value = "Total"

    for (let w_s in exceldatalower) {
      row++
      col = 1
      let w_t = w_s.split("-")[0]
      let shift = w_s.split("-")[1]
      if (w_t == "Company") {
        worksheet.getCell(row, 1).value = shift
        worksheet.getCell(row, 2).value = "Company"
        col = 4
        for (w_t_obj in exceldatalower[w_s]) {
          worksheet.getCell(row, col++).value = exceldatalower[w_s][w_t_obj]
        }
        totalHeat += exceldatalower[w_s]['total']


      }
      else {
        worksheet.getCell(row, 1).value = shift
        worksheet.getCell(row, 2).value = "Contractor"
        worksheet.getCell(row, 3).value = w_t
        col = 4
        for (w_t_obj in exceldatalower[w_s]) {
          worksheet.getCell(row, col++).value = exceldatalower[w_s][w_t_obj]
        }
        totalHeat += exceldatalower[w_s]['total']
      }



    }
    row++
    worksheet.mergeCells(`A${row}:H${row}`)
    worksheet.getCell(`A${row}`).alignment = alignment
    worksheet.getCell(`A${row}`).value = `Total no of heats as on ${inputDate.split("-")[2]}-${inputDate.split("-")[1]}-${inputDate.split("-")[0]}`
    worksheet.getCell(`I${row}`).value = totalHeat
    row++

    const startDate = new Date(`${inputDate.split("-")[0]}-${inputDate.split("-")[1]}-01`);
    const endDate = new Date(inputDate);

    const totalHeats = await Heat.aggregate([
      {
        $addFields:{
          dateField: { $toDate: "$inputDate"}
        }
      },
      {
        $match:{
          dateField:{
            $gte: startDate,
            $lte:endDate
          }
        }
      }
    ])

    monthlyExcelData={}

    for (let heat_obj of totalHeats) {
      if (heat_obj["workerType"] == "Company") {
        if (monthlyExcelData[`Company-${heat_obj['shiftNumber'].toUpperCase()}`]) {
          tempData = monthlyExcelData[`Company-${heat_obj['shiftNumber'].toUpperCase()}`]
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[mg] += 1
              tempData["total"] += 1
              break
            }
          }
        }
        else {
          tempData = {}
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[heat_obj['mouldingSection']] = 1
            }
            else {
              tempData[mg] = 0
            }
          }
          tempData['total'] = 1
          monthlyExcelData[`Company-${heat_obj['shiftNumber'].toUpperCase()}`] = tempData
        }
      }
      else {
        if (monthlyExcelData[`${heat_obj['contractorName'].toUpperCase()}-${heat_obj['shiftNumber'].toUpperCase()}`]) {
          tempData = monthlyExcelData[`${heat_obj['contractorName'].toUpperCase()}-${heat_obj['shiftNumber'].toUpperCase()}`]
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[mg] += 1
              tempData["total"] += 1
              break
            }
          }
        }
        else {
          tempData = {}
          for (let mg of metGrade) {
            if (mg == heat_obj['mouldingSection']) {
              tempData[heat_obj['mouldingSection']] = 1
            }
            else {
              tempData[mg] = 0
            }
          }
          tempData['total'] = 1
          monthlyExcelData[`${heat_obj['contractorName'].toUpperCase()}-${heat_obj['shiftNumber'].toUpperCase()}`] = tempData
        }
      }
    }

    totalHeat = 0
    col = 4
    worksheet.getCell(row, 1).value = "Shift Number"
    worksheet.getCell(row, 2).value = "Worker Type"
    worksheet.getCell(row, 3).value = "Worker Name"
    for (header of metGrade) {
      worksheet.getCell(row, col++).value = header
    }
    worksheet.getCell(row, 9).value = "Total"

    for (let w_s in monthlyExcelData) {
      row++
      col = 1
      let w_t = w_s.split("-")[0]
      let shift = w_s.split("-")[1]
      if (w_t == "Company") {
        worksheet.getCell(row, 1).value = shift
        worksheet.getCell(row, 2).value = "Company"
        col = 4
        for (w_t_obj in monthlyExcelData[w_s]) {
          worksheet.getCell(row, col++).value = monthlyExcelData[w_s][w_t_obj]
        }
        totalHeat += monthlyExcelData[w_s]['total']


      }
      else {
        worksheet.getCell(row, 1).value = shift
        worksheet.getCell(row, 2).value = "Contractor"
        worksheet.getCell(row, 3).value = w_t
        col = 4
        for (w_t_obj in monthlyExcelData[w_s]) {
          worksheet.getCell(row, col++).value = monthlyExcelData[w_s][w_t_obj]
        }
        totalHeat += monthlyExcelData[w_s]['total']
      }



    }
    row++
    worksheet.mergeCells(`A${row}:H${row}`)
    worksheet.getCell(`A${row}`).alignment = alignment
    worksheet.getCell(`A${row}`).value = `Total no of heats as on MTD`
    worksheet.getCell(`I${row}`).value = totalHeat
    row++

   


    // console.log(totalHeat)
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats.officedocument.spreadsheatml.sheet"
    )
    res.setHeader(
      "Content-Disposition", `attachment; filename=${inputDate}.xlsx`)


    return workbook.xlsx.write(res).then(() => {
      res.status(200)
    })
  }

  catch (err) {
    console.log(err)
    return res.status(500).json({
      success: false,
      message: "Excel cannot be generated",
      err
    })
  }
}


exports.getHeatDetails = async (req,res)=>{
  try{
    const{ heatNo}= req.body
    const heat= await Heat.findOne({ heatNo }).populate([{
      path: "itemDescription"
    },
    {
      path: "logDetails"
    }]).exec()
    if(!heat){
      return res.status(400).json({
        success: false,
        message: "Heat Number doesnot exist",
      })
    }
    return res.status(200).json({
      success:true,
      heat
    })


  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: "Cannot fetch heat",
      err
    })
  }
}

exports.editHeatDetails = async(req,res)=> {
  try {
    // console.log(req.body)
    const {
      inputDate,
      heatNo,
      meltingSupervisor: meltingSupervisor,
      mouldingSupervisor: mouldingSupervisor,
      pouringSupervisor: pouringSupervisor,
      coreSupervisor: coreSupervisor,
      shiftIncharge,
      furnaceNo,
      workerType,
      contractorName,
      sandIncharge,
      metalGrade,
      mouldingSection: mouldingSection,
      shiftNumber
    } = req.body
    // console.log(inputDate)
    const existingHeat = await Heat.findOne({ heatNo })
    // const date = new Date(inputDate)
    // if (!moment(date, "DD-MM-YYYY", true).isValid()) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "Invalid Date",
    //   })
    // }


    // const meltingSupervisor=JSON.parse(_meltingSupervisor)
    // const mouldingSupervisor=JSON.parse(_mouldingSupervisor)
    // const coreSupervisor=JSON.parse(_coreSupervisor)
    // const pouringSupervisor=JSON.parse(_pouringSupervisor)
    // const mouldingSection=JSON.parse(_mouldingSection)
    filter={
      heatNo:heatNo
    }
    const heat = await Heat.findOneAndUpdate(filter,{
      inputDate,
      heatNo,
      meltingSupervisor,
      mouldingSupervisor,
      pouringSupervisor,
      coreSupervisor,
      shiftIncharge,
      furnaceNo,
      workerType,
      contractorName,
      sandIncharge,
      metalGrade,
      mouldingSection,
      shiftNumber
    },{new:true}).populate([{
      path: "itemDescription"
    },
    {
      path: "logDetails"
    }]).exec()
    return res.status(200).json({
      success: true,
      message: "Heat edited successfully",
      heat
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Heat cannot be edited. Please try again.",
    })
  }
}