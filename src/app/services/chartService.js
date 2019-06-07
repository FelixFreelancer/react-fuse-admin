import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import { examDefaultValues } from './../main/chart/Values';

/**
 * @author Sharan (Zweck)
 * @description Create a report using jsPdf
 * A4 size page: 297mm*210mm
 */
export default class Report {
  report;
  page = 1;
  verticalCursor = 45;
  isFirstPage = true;
  dimensions = {
    height: 297,
    width: 210
  }
  // calculatedTime;

  constructor(data) {
    console.log("Harsha", data);
    this.report = new jsPDF();
    // this.calculatedTime = calculatedTime;
    this.generate(data);
  }

  /**
   * Save the Report using the filename provided
   * @param filename string
   */
  save(filename) {
    return this.report.save(filename);
  }

  /**
   * Generate the data
   * @param data Array of Time
   */
  generate(data) {

    if (this.isFirstPage == true) {
      //Add Patient detail header
      this.report.line(5, 36, 205, 36);
      this.report.line(5, 42, 205, 42);

      this.addChartHeader(data.patientProfile);
    }

    data.contactLens.forEach(contactLens => {
      this.addContactLens(contactLens);
    });

    // this.drawTable();

    // this.verticalCursor += 60



    // data.forEach(log => {
    //   if (this.verticalCursor >= 285) {
    //     this.addPage();
    //   }

    //   this.report.setFontType('thin');
    //   this.verticalCursor += 5;
    //   const description = log.description
    //     ? log.description.replace(/[^a-zA-Z ]/g, '')
    //     : 'N/A';

    //   this.report.text(
    //     10,
    //     this.verticalCursor,
    //     log.createdAt ? moment.unix(log.createdAt.seconds).format('ll') : 'N/A'
    //   );

    //   this.report.text(158, this.verticalCursor, log.isBillable ? 'Yes' : 'No');
    //   this.report.text(
    //     180,
    //     this.verticalCursor,
    //     log.time ? log.time.toFixed(2) + ' Hours' : 'N/A'
    //   );

    //   this.splitDescription(description, 80).forEach(string => {
    //     this.report.text(40, this.verticalCursor, string);
    //     this.verticalCursor += 3;
    //   });
    // });
  }

  /**
   * @author Sharan (Zweck)
   * @description Generates the table Border.
   * Checks if the page is cover / not
   */
  drawTable() {
    let verticalCursor = 14;
    let topLinePosition = 10;
    //(x1,y1,x2,y2)
    // this.report.line(5, 290, 205, 290);
    if (this.isFirstPage == true) {
      topLinePosition += 20;
      verticalCursor += 23;
      // this.report.addImage(logoData, 'PNG', 15, 10, 38, 20);
      this.report.setFontSize(9);
      this.report.setFontType('bold');
      // this.report.text(
      //   140,
      //   50,
      //   `Billable : ${this.calculatedTime.billableTime} Hrs | Non Billable : ${
      //   this.calculatedTime.nonBillabletime
      //   } Hrs`
      // );


      // this.report.text(10, 20, `Generated on ${new Date()}`);

      this.report.line(5, topLinePosition + 2, 205, topLinePosition + 2);
      this.report.line(5, topLinePosition + 11, 205, topLinePosition + 11);
      // this.addNearVision(verticalCursor + 8, topLinePosition + 11);
      // this.addDistanceVision(verticalCursor + 44, topLinePosition + 50);

      this.report.line(15, 280, 50, 280);
      this.report.text(18, 284, 'Signature');
    }

    // this.report.line(5, topLinePosition + 7, 205, topLinePosition + 7);

    // Vertical lines
    // this.report.line(35, topLinePosition, 35, 290);
    // this.report.line(150, topLinePosition, 150, 290);
    // this.report.line(172, topLinePosition, 172, 290);
    // this.report.line(5, topLinePosition, 5, 290);
    // this.report.line(205, topLinePosition, 205, 290);


    // this.report.text(85, verticalCursor, 'Insurance');
    // this.report.text(153, verticalCursor, 'BILLABLE');
    // this.report.text(183, verticalCursor, 'Diagnosis');

  }

  addNearVision(verticalCursor, topLinePosition) {
    this.report.setFontType('bold');
    this.report.text(15, verticalCursor + 5, 'Distance Vision(Final Glasses)');
    this.report.text(130, verticalCursor + 5, 'Expires 00/00/0000');
    this.report.setFontType('thin');
    this.report.text(33, verticalCursor + 12, 'Sphere');
    this.report.text(70, verticalCursor + 12, 'Cylinder');
    this.report.text(110, verticalCursor + 12, 'Axis');
    this.report.text(145, verticalCursor + 12, 'Add');
    this.report.text(170, verticalCursor + 12, 'Prism');
    this.report.text(15, verticalCursor + 20, 'OD');
    this.report.text(15, verticalCursor + 28, 'OS');
    //Values
    this.report.text(33, verticalCursor + 20, '-12.50');
    this.report.text(70, verticalCursor + 20, '-12.50');
    this.report.text(110, verticalCursor + 20, '0');
    this.report.text(145, verticalCursor + 20, '0.00');
    this.report.text(170, verticalCursor + 20, '');

    this.report.text(33, verticalCursor + 28, '-12.50');
    this.report.text(70, verticalCursor + 28, '-12.50');
    this.report.text(110, verticalCursor + 28, '0');
    this.report.text(145, verticalCursor + 28, '0.00');
    this.report.text(170, verticalCursor + 28, '');

    this.report.line(5, topLinePosition + 36, 205, topLinePosition + 36);

  }

  addDistanceVision(verticalCursor, topLinePosition) {
    this.report.setFontType('bold');
    this.report.text(15, verticalCursor + 5, 'Near Vision(Final Glasses)');
    this.report.text(130, verticalCursor + 5, 'Expires 00/00/0000');
    this.report.setFontType('thin');
    this.report.text(33, verticalCursor + 12, 'Sphere');
    this.report.text(70, verticalCursor + 12, 'Cylinder');
    this.report.text(110, verticalCursor + 12, 'Axis');
    this.report.text(145, verticalCursor + 12, 'Add');
    this.report.text(170, verticalCursor + 12, 'Prism');
    this.report.text(15, verticalCursor + 20, 'OD');
    this.report.text(15, verticalCursor + 28, 'OS');
    //Values
    this.report.text(33, verticalCursor + 20, '-12.50');
    this.report.text(70, verticalCursor + 20, '-12.50');
    this.report.text(110, verticalCursor + 20, '0');
    this.report.text(145, verticalCursor + 20, '0.00');
    this.report.text(170, verticalCursor + 20, '');

    this.report.text(33, verticalCursor + 28, '-12.50');
    this.report.text(70, verticalCursor + 28, '-12.50');
    this.report.text(110, verticalCursor + 28, '0');
    this.report.text(145, verticalCursor + 28, '0.00');
    this.report.text(170, verticalCursor + 28, '');


    this.report.line(5, topLinePosition + 36, 205, topLinePosition + 36);
  }


  /**
   * @description Dynamically add new contact lens. Add new page if the space is not sufficient.
   * @param prescription Object
   */
  addContactLens = (contactLens) => {
    const minVerticalHeight = 40;
    if (this.dimensions.height - this.verticalCursor < minVerticalHeight) {
      //Add new page
      this.addPage();
    }
    this.report.setFontSize(12);
    this.report.setFontType('bold');
    this.report.text(15, this.verticalCursor + 5, 'Contact Lens');
    this.report.text(130, this.verticalCursor + 5, 'Expires 00/00/0000');
    this.report.setFontSize(10);
    this.report.setFontType('thin');
    this.report.text(33, this.verticalCursor + 12, 'Sphere');
    this.report.text(55, this.verticalCursor + 12, 'Cylinder');
    this.report.text(85, this.verticalCursor + 12, 'Axis');
    this.report.text(105, this.verticalCursor + 12, 'Add');
    this.report.text(125, this.verticalCursor + 12, 'Base Curve');
    this.report.text(150, this.verticalCursor + 12, 'Dia');
    this.report.text(170, this.verticalCursor + 12, 'Brand');
    this.report.text(15, this.verticalCursor + 20, 'OD');
    this.report.text(15, this.verticalCursor + 30, 'OS');
    //Values
    this.report.text(33, this.verticalCursor + 20, contactLens.OD.sphere.toString() || '-');
    this.report.text(55, this.verticalCursor + 20, contactLens.OD.cylinder.toString() || '-');
    this.report.text(85, this.verticalCursor + 20, contactLens.OD.axis.toString() || '-');
    this.report.text(105, this.verticalCursor + 20, contactLens.OD.add.toString() || '-');
    this.report.text(125, this.verticalCursor + 20, contactLens.OD.baseCurve.toString() || '-');
    this.report.text(150, this.verticalCursor + 20, contactLens.OD.dia.toString() || '-');
    this.report.text(170, this.verticalCursor + 20, contactLens.OD.brand.toString() || '-');

    this.report.text(33, this.verticalCursor + 30, contactLens.OD.sphere.toString() || '-');
    this.report.text(55, this.verticalCursor + 30, contactLens.OD.cylinder.toString() || '-');
    this.report.text(85, this.verticalCursor + 30, contactLens.OD.axis.toString() || '-');
    this.report.text(105, this.verticalCursor + 30, contactLens.OD.add.toString() || '-');
    this.report.text(125, this.verticalCursor + 30, contactLens.OD.baseCurve.toString() || '-');
    this.report.text(150, this.verticalCursor + 30, contactLens.OD.dia.toString() || '-');
    this.report.text(170, this.verticalCursor + 30, contactLens.OD.brand.toString() || '-');
    this.verticalCursor += 40;
  }

  /**
   * @param patient
   * @description Create patient details only in the first page
   */
  addChartHeader = (patientProfile) => {
    this.report.setFontType('thin');
    this.report.setFontSize(14);
    this.report.text(82, 15, `Vision Prescription`);
    this.report.setFontType('thin');
    this.report.setFontSize(10);
    this.report.text(20, 15, `Practice Name`);
    this.report.setFontSize(7);
    this.report.text(20, 18, patientProfile.address1 || '--');
    this.report.text(20, 21, patientProfile.address2 || '--');
    this.report.text(20, 24, patientProfile.city || '--');
    this.report.text(20, 27, patientProfile.state || '--');
    this.report.text(20, 30, patientProfile.zip || '--');
    this.report.text(20, 33, patientProfile.pincode || '--');
    this.report.setFontType('thin');
    this.report.setFontSize(11);
    this.report.text(15, 40, patientProfile.user.firstName || '--');
    this.report.text(75, 40, patientProfile.user.lastName || '--');
    this.report.text(150, 40, '00/00/0000');
  }

  /**
   * Add a new page
   */
  addPage() {
    this.page++;
    this.isFirstPage = false;

    this.report.addPage();

    // this.drawTable();
    this.verticalCursor = 18;
    // this.addFooter();
  }

  /**
   * Add the page footer
   */
  addFooter() {
    this.report.setFontType('thin');
    this.report.text(195, 10, `Page ${this.page}`);
    this.report.text(150, 294, `Powered by Plano | https://getplano.com/`);
    this.report.text(7, 294, `Patient : Hello world`);
  }

  /**
   * Split the description into an array
   * of string based on string length
   * @author Sharan Mohandas
   * @param description string
   */
  splitDescription(description, length) {
    const strings = [];
    if (!description) {
      return strings;
    }
    let l = length;
    while (description.length > l) {
      let pos = description.substring(0, l).lastIndexOf(' ');
      pos = pos <= 0 ? l : pos;
      strings.push(description.substring(0, pos));
      let i = description.indexOf(' ', pos) + 1;
      if (i < pos || i > pos + l) {
        i = pos;
      }
      description = description.substring(i);
      l = length;
    }
    strings.push(description);
    return strings;
  }
}
