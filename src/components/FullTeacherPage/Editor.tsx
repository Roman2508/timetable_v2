import React from 'react'
// @ts-ignore
import List from '@editorjs/list'
import Header from '@editorjs/Header'
import EditorJS, { OutputBlockData, OutputData } from '@editorjs/editorjs'

interface IEditorBlockProps {
  setBlocks: React.Dispatch<React.SetStateAction<OutputBlockData<string, any>[]>>
  blocks: OutputData['blocks']
}

const EditorBlock: React.FC<IEditorBlockProps> = ({ setBlocks, blocks }) => {
  //add a reference to editor
  const ref = React.useRef<EditorJS>()

  //initialize editorjs
  React.useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        placeholder: 'Введіть список ваших публікацій',
        tools: {
          paragraph: {
            shortcut: 'CMD+P',
          },
          list: {
            class: List,
            // inlineToolbar: true,
            config: {
              defaultStyle: 'ordered',
            },
            shortcut: 'CMD+L',
          },
          header: {
            // @ts-ignore
            class: Header,
            inlineToolbar: true,
            levels: [2, 3, 4, 5, 6],
            defaultLevel: 3,
            shortcut: 'CMD+H',
          },
        },
        async onChange() {
          const { blocks } = await editor.save()
          setBlocks(blocks)
        },
        data: {
          blocks,
        },

        /*  */

        i18n: {
          /**
           * @type {I18nDictionary}
           */
          messages: {
            /**
             * Other below: translation of different UI components of the editor.js core
             */
            ui: {
              blockTunes: {
                toggler: {
                  'Click to tune': 'Натисніть щоб налаштувати',
                  'or drag to move': 'або перетягніть',
                },
              },
              inlineToolbar: {
                converter: {
                  'Convert to': 'Конвертувати в',
                },
              },
              toolbar: {
                toolbox: {
                  Add: 'Додати',
                },
              },
            },

            /**
             * Section for translation Tool Names: both block and inline tools
             */
            toolNames: {
              Text: 'Абзац',
              Heading: 'Заголовок',
              List: 'Список',
              Bold: 'Напівжирний',
              Italic: 'Курсив',
              InlineCode: 'Моноширинный',
            },

            /**
             * Section for passing translations to the external tools classes
             */
            tools: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded plugin
               * The name of a plugin should be equal the name you specify in the 'tool' section for that plugin
               */
              list: {
                // <-- 'Warning' tool will accept this dictionary section
                Title: 'Название',
                Message: 'Сообщение',
                Unordered: 'Марковані',
                Ordered: 'Нумерований',
              },
              header: {
                'Heading 1': 'Заголовок 1',
                'Heading 2': 'Заголовок 2',
                'Heading 3': 'Заголовок 3',
                'Heading 4': 'Заголовок 4',
                'Heading 5': 'Заголовок 5',
                'Heading 6': 'Заголовок 6',
              },

              /**
               * The "stub" is an internal block tool, used to fit blocks that does not have the corresponded plugin
               */
              stub: {
                'The block can not be displayed correctly.': 'Блок не може бути відображений',
              },
            },

            /**
             * Section allows to translate Block Tunes
             */
            blockTunes: {
              /**
               * Each subsection is the i18n dictionary that will be passed to the corresponded Block Tune plugin
               * The name of a plugin should be equal the name you specify in the 'tunes' section for that plugin
               *
               * Also, there are few internal block tunes: "delete", "moveUp" and "moveDown"
               */

              delete: {
                Delete: 'Видалити',
              },
              moveUp: {
                'Move up': 'Перемістити вверх',
              },
              moveDown: {
                'Move down': 'Перемістити вниз',
              },
            },
          },
        },
      })

      ref.current = editor
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy()
      }
    }
  }, [])

  return <div id={'editorjs'} />
}

export default React.memo(EditorBlock)
