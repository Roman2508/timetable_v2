import {
  TextRun,
  Document,
  Paragraph,
  TabStopType,
  HeadingLevel,
  CharacterSet,
  AlignmentType,
  TabStopPosition,
  Table,
  TableRow,
  TableCell,
  WidthType,
} from "docx"
import * as fs from "fs"

// const font = fs.readFileSync("src/assets/fonts/Times-New-Roman.ttf")
// const font = fs.readFileSync("../../../assets/fonts/Times-New-Roman.ttf")

import font from "../../../assets/fonts/Times-New-Roman.ttf"

const PHONE_NUMBER = "07534563401"
const PROFILE_URL = "https://www.linkedin.com/in/dolan1"
const EMAIL = "docx@docx.com"

type AlignmentType =
  | "start"
  | "center"
  | "end"
  | "both"
  | "mediumKashida"
  | "distribute"
  | "numTab"
  | "highKashida"
  | "lowKashida"
  | "thaiDistribute"
  | "left"
  | "right"
  | undefined

export class DocumentCreator {
  // tslint:disable-next-line: typedef
  public create([experiences, educations, skills, achivements]): Document {
    const document = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 1134,
                bottom: 1134,
                right: 850,
                left: 850,
              },
            },
          },
          children: [
            this.createParagraph("Затверджую", "right", 24),
            this.createParagraph("заступник директора з навчальної роботи", "right", 24),
            this.createParagraph("________________________ Луцак Ірина Василівна", "right", 24, false, {
              before: 0,
              after: 480,
            }),

            this.createParagraph("Житомирський базовий фармацевтичний фаховий коледж", "center", 28, true),
            this.createParagraph("Житомирської обласної ради", "center", 28, true, {
              before: 0,
              after: 240,
            }),
            this.createParagraph("Циклова комісія_______________________________________________", "center", 24, true, {
              before: 0,
              after: 240,
            }),
            this.createParagraph("ІНДИВІДУАЛЬНИЙ ПЛАН РОБОТИ ВИКЛАДАЧА ТА ЇЇ ОБЛІК", "center", 28, true),
            this.createParagraph("Пташник Р.В.", "center", 28, true),
            this.createParagraph("на 2023 - 2024 н.р.", "center", 28, false, {
              before: 360,
              after: 240,
            }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { bottom: 240 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createParagraph("Посада", "left", 24)],
                      margins: { top: 10, bottom: 10, left: 20 },
                    }),
                    new TableCell({
                      children: [this.createParagraph("Науковий ступінь", "left", 24)],
                      margins: { top: 10, bottom: 10, left: 20 },
                    }),
                    new TableCell({
                      children: [this.createParagraph("Вчене звання", "left", 24)],
                      margins: { top: 10, bottom: 10, left: 20 },
                    }),
                    new TableCell({
                      children: [this.createParagraph("Ставка або її частина", "left", 24)],
                      margins: { top: 10, bottom: 10, left: 20 },
                    }),
                    new TableCell({
                      children: [this.createParagraph("Примітка", "left", 24)],
                      margins: { top: 10, bottom: 10, left: 20 },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createParagraph(" ", "left", 24)],
                      margins: { top: 40, bottom: 40 },
                    }),
                    new TableCell({
                      children: [this.createParagraph(" ", "left", 24)],
                      margins: { top: 40, bottom: 40 },
                    }),
                    new TableCell({
                      children: [this.createParagraph(" ", "left", 24)],
                      margins: { top: 40, bottom: 40 },
                    }),
                    new TableCell({
                      children: [this.createParagraph(" ", "left", 24)],
                      margins: { top: 40, bottom: 40 },
                    }),
                    new TableCell({
                      children: [this.createParagraph(" ", "left", 24)],
                      margins: { top: 40, bottom: 40 },
                    }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph("НАВЧАЛЬНА РОБОТА НА 2023-2024 н.р.", "center", 28, true, {
              before: 360,
              after: 240,
            }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { top: 10, bottom: 10, left: 20, right: 20 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createTableParagraph("№"), this.createTableParagraph("з/п")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Назва"),
                        this.createTableParagraph("навчальних"),
                        this.createTableParagraph("дисципліни"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Шифр"),
                        this.createTableParagraph("груп"),
                        this.createTableParagraph("(потоків)"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Читання"), this.createTableParagraph("лекцій")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Проведення"),
                        this.createTableParagraph("практичних"),
                        this.createTableParagraph("занять"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Проведення"),
                        this.createTableParagraph("лабораторних"),
                        this.createTableParagraph("занять"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Проведення"),
                        this.createTableParagraph("семінарських"),
                        this.createTableParagraph("занять"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Проведення"),
                        this.createTableParagraph("індивідуальних"),
                        this.createTableParagraph("занять"),
                      ],
                      verticalAlign: "center",
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({ children: [this.createTableParagraph("2")] }),
                    new TableCell({ children: [this.createTableParagraph("3")] }),
                    new TableCell({ children: [this.createTableParagraph("4")] }),
                    new TableCell({ children: [this.createTableParagraph("5")] }),
                    new TableCell({ children: [this.createTableParagraph("6")] }),
                    new TableCell({ children: [this.createTableParagraph("7")] }),
                    new TableCell({ children: [this.createTableParagraph("8")] }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({ children: [this.createTableParagraph("Інформатика", "left")] }),
                    new TableCell({ children: [this.createTableParagraph("PH9-22-1")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("48")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph(
              'Затверджено на засіданні кафедри, циклової комісії "_____" _____________________ ',
              "both",
              28,
              false,
              {
                before: 240,
                after: 80,
              }
            ),

            this.createParagraph("20____ року. Протокол№ _____________", "both", 28, false, {
              before: 0,
              after: 360,
            }),

            this.createParagraph("Методична робота", "center", 28, true, { before: 0, after: 240 }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { top: 10, bottom: 10, left: 20, right: 20 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createTableParagraph("№")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Види робіт")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("К-ть "), this.createTableParagraph("годин")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Зміст роботи")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Термін"), this.createTableParagraph("виконання")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Позначка"),
                        this.createTableParagraph("про"),
                        this.createTableParagraph("виконання"),
                      ],
                      verticalAlign: "center",
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({
                      children: [
                        this.createTableParagraph(
                          "Завантаження навчально-методичного забезпечення дисципліни на навчальну платформу коледжу Moodle",
                          "left"
                        ),
                      ],
                    }),
                    new TableCell({ children: [this.createTableParagraph("50")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("Протягом року")] }),
                    new TableCell({ children: [this.createTableParagraph("Виконано")] }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("2")] }),
                    new TableCell({
                      children: [this.createTableParagraph("Створення Програми з дисципліни", "left")],
                    }),
                    new TableCell({ children: [this.createTableParagraph("50")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("Протягом року")] }),
                    new TableCell({ children: [this.createTableParagraph("Виконано")] }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph("Наукова робота", "center", 28, true, { before: 360, after: 240 }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { top: 10, bottom: 10, left: 20, right: 20 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createTableParagraph("№")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Види робіт")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("К-ть "), this.createTableParagraph("годин")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Зміст роботи")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Термін"), this.createTableParagraph("виконання")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Позначка"),
                        this.createTableParagraph("про"),
                        this.createTableParagraph("виконання"),
                      ],
                      verticalAlign: "center",
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({
                      children: [
                        this.createTableParagraph(
                          "Завантаження навчально-методичного забезпечення дисципліни на навчальну платформу коледжу Moodle",
                          "left"
                        ),
                      ],
                    }),
                    new TableCell({ children: [this.createTableParagraph("50")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("Протягом року")] }),
                    new TableCell({ children: [this.createTableParagraph("Виконано")] }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("2")] }),
                    new TableCell({
                      children: [this.createTableParagraph("Створення Програми з дисципліни", "left")],
                    }),
                    new TableCell({ children: [this.createTableParagraph("50")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("Протягом року")] }),
                    new TableCell({ children: [this.createTableParagraph("Виконано")] }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph("Організаційна робота", "center", 28, true, { before: 360, after: 240 }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { top: 10, bottom: 10, left: 20, right: 20 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createTableParagraph("№")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Види робіт")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("К-ть "), this.createTableParagraph("годин")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Зміст роботи")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [this.createTableParagraph("Термін"), this.createTableParagraph("виконання")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Позначка"),
                        this.createTableParagraph("про"),
                        this.createTableParagraph("виконання"),
                      ],
                      verticalAlign: "center",
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({
                      children: [
                        this.createTableParagraph(
                          "Завантаження навчально-методичного забезпечення дисципліни на навчальну платформу коледжу Moodle",
                          "left"
                        ),
                      ],
                    }),
                    new TableCell({ children: [this.createTableParagraph("50")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("Протягом року")] }),
                    new TableCell({ children: [this.createTableParagraph("Виконано")] }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("2")] }),
                    new TableCell({
                      children: [this.createTableParagraph("Створення Програми з дисципліни", "left")],
                    }),
                    new TableCell({ children: [this.createTableParagraph("50")] }),
                    new TableCell({ children: [this.createTableParagraph("")] }),
                    new TableCell({ children: [this.createTableParagraph("Протягом року")] }),
                    new TableCell({ children: [this.createTableParagraph("Виконано")] }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph(
              "____________________________________________________Голова циклової комісії",
              "both",
              28,
              false,
              {
                before: 240,
                after: 80,
              }
            ),

            this.createParagraph("____________________________________________________Викладач", "both", 28, false, {
              before: 0,
              after: 360,
            }),

            this.createParagraph("ПЕРЕЛІК ЗМІН У ПЛАНІ РОБОТИ ВИКЛАДАЧА", "center", 28, true, {
              before: 0,
              after: 240,
            }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { top: 10, bottom: 10, left: 20, right: 20 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createTableParagraph("Дата, вид"), this.createTableParagraph("робіт")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Зміст внесених змін та їх"),
                        this.createTableParagraph("обґрунтування"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Підпис завідувача кафедри,"),
                        this.createTableParagraph("голови циклової комісії"),
                      ],
                      verticalAlign: "center",
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({ children: [this.createTableParagraph("2")] }),
                    new TableCell({ children: [this.createTableParagraph("3")] }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph("ЗАУВАЖЕННЯ ОСІБ, ЯКІ ПЕРЕВІРЯЮТЬ РОБОТУ ЦИКЛОВОЇ КОМІСІЇ", "center", 28, true, {
              before: 360,
              after: 240,
            }),

            /*  */

            new Table({
              width: {
                size: 100, // 100% width
                type: WidthType.PERCENTAGE,
              },
              margins: { top: 10, bottom: 10, left: 20, right: 20 },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [this.createTableParagraph("Дата, вид"), this.createTableParagraph("робіт")],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Зміст внесених змін та їх"),
                        this.createTableParagraph("обґрунтування"),
                      ],
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [
                        this.createTableParagraph("Підпис завідувача кафедри,"),
                        this.createTableParagraph("голови циклової комісії"),
                      ],
                      verticalAlign: "center",
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph("1")] }),
                    new TableCell({ children: [this.createTableParagraph("2")] }),
                    new TableCell({ children: [this.createTableParagraph("3")] }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                    new TableCell({ children: [this.createTableParagraph(" ")] }),
                  ],
                }),
              ],
            }),

            /*  */

            this.createParagraph("", "center", 28, true, {
              before: 0,
              after: 240,
            }),

            /*  */
            /*  */
            /*  */
            /*  */

            this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL),
            this.createHeading("Education"),
            ...educations
              .map((education) => {
                const arr: Paragraph[] = []
                arr.push(
                  this.createInstitutionHeader(
                    education.schoolName,
                    `${education.startDate.year} - ${education.endDate.year}`
                  )
                )
                arr.push(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`))

                const bulletPoints = this.splitParagraphIntoBullets(education.notes)
                bulletPoints.forEach((bulletPoint) => {
                  arr.push(this.createBullet(bulletPoint))
                })

                return arr
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading("Experience"),
            ...experiences
              .map((position) => {
                const arr: Paragraph[] = []

                arr.push(
                  this.createInstitutionHeader(
                    position.company.name,
                    this.createPositionDateText(position.startDate, position.endDate, position.isCurrent)
                  )
                )
                arr.push(this.createRoleText(position.title))

                const bulletPoints = this.splitParagraphIntoBullets(position.summary)

                bulletPoints.forEach((bulletPoint) => {
                  arr.push(this.createBullet(bulletPoint))
                })

                return arr
              })
              .reduce((prev, curr) => prev.concat(curr), []),
            this.createHeading("Skills, Achievements and Interests"),
            this.createSubHeading("Skills"),
            this.createSkillList(skills),
            this.createSubHeading("Achievements"),
            ...this.createAchivementsList(achivements),
            this.createSubHeading("Interests"),
            this.createInterests("Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing."),
            this.createHeading("References"),
            new Paragraph(
              "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
            ),
            new Paragraph("More references upon request"),
            new Paragraph({
              text: "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.",
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
      // fonts: [{ name: "Times New Roman", data: formData, characterSet: CharacterSet.ANSI }],
    })

    return document
  }

  public createContactInfo(phoneNumber: string, profileUrl: string, email: string): Paragraph {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`),
        new TextRun({
          text: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
          break: 1,
        }),
      ],
    })
  }

  public createParagraph(
    text: string,
    alignment: AlignmentType,
    size: number,
    bold?: boolean,
    spacing?: {
      before: number
      after: number
    }
  ): Paragraph {
    return new Paragraph({
      alignment,
      children: [
        new TextRun({
          text,
          font: "Times New Roman",
          size,
          bold: !!bold,
        }),
      ],
      spacing: spacing
        ? spacing
        : {
            before: 0,
            after: 0,
          },
    })
  }

  public createTableParagraph(text: string, alignment: AlignmentType = "center"): Paragraph {
    return new Paragraph({
      alignment,
      children: [
        new TextRun({
          text,
          font: "Times New Roman",
          size: 24,
        }),
      ],
    })
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    })
  }

  public createSubHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_2,
    })
  }

  public createInstitutionHeader(institutionName: string, dateText: string): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    })
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    })
  }

  public createBullet(text: string): Paragraph {
    return new Paragraph({
      text: text,
      bullet: {
        level: 0,
      },
    })
  }

  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    return new Paragraph({
      children: [new TextRun(skills.map((skill) => skill.name).join(", ") + ".")],
    })
  }

  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    return achivements.map(
      (achievement) =>
        new Paragraph({
          text: achievement.name,
          bullet: {
            level: 0,
          },
        })
    )
  }

  public createInterests(interests: string): Paragraph {
    return new Paragraph({
      children: [new TextRun(interests)],
    })
  }

  public splitParagraphIntoBullets(text: string): string[] {
    return text.split("\n\n")
  }

  // tslint:disable-next-line:no-any
  public createPositionDateText(startDate: any, endDate: any, isCurrent: boolean): string {
    const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year
    const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`

    return `${startDateText} - ${endDateText}`
  }

  public getMonthFromInt(value: number): string {
    switch (value) {
      case 1:
        return "Jan"
      case 2:
        return "Feb"
      case 3:
        return "Mar"
      case 4:
        return "Apr"
      case 5:
        return "May"
      case 6:
        return "Jun"
      case 7:
        return "Jul"
      case 8:
        return "Aug"
      case 9:
        return "Sept"
      case 10:
        return "Oct"
      case 11:
        return "Nov"
      case 12:
        return "Dec"
      default:
        return "N/A"
    }
  }
}
