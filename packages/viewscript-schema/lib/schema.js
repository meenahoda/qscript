module.exports = {
  "$schema": "http://json-schema.org/draft-07/schema#",

  "title": "Viewscript Schema",
  "description": "A simple way to define feature-rich web forms",
  "version": "0.0.1",

  "definitions": {

    "id": {"type": "string", "title": "A unique string which identifies the widget - often used to bind the value being collected by a widget to an underlying data model. Providing an `id` value is very often mandatory (depending on the type of widget involved). Regardless, it is good practice to always provide an `id` because it assists modification (or \"_patching_\") of form definitions."},
    "type": {"type": "string", "title": "A mandatory value denoting the type of widget being defined (e.g. `text`, `number` etc.)"},
    "showWhen": {"type": "string", "title": "An expression, that when evaluating to `true` will cause the widget to appear (so the widget will not be shown if evaluated to be `false`)."},

    "attributes": {
      "content": {"type": "string", "title": "Some read only text to display."},
      "heading": {"type": "string", "title": "Some short, strong, punchy text to identify the widget."},
      "placeholder": {"type": "string", "title": "Some example text that can be appear inside a widget ahead of collecting user input. "},
      "minimum": {"type": "number", "title": "The minimum numeric value a user can specify."},
      "maximum": {"type": "number", "title": "The maximum numeric value a user can specify."},
      "minCharacters": {"type": "number", "title": "The minimum length of number of characters a will need to provide.", "min": 1},
      "maxCharacters": {"type": "number", "title": "The maximum length of number of characters a user can specify."},
      "numericValue": {"type": "value", "title": "Explicitly assert that the widget receive and store numeric values (usually of use with title-map enumerations)."},
      "default": {"type": "any", "title": "A value to default a widget to if not supplied by other mechanisms."},
      "defaultString": {"type": "string", "title": "A string value to default a widget to if not supplied by other mechanisms."},
      "defaultNumber": {"type": "number", "title": "A numeric value to default a widget to if not supplied by other mechanisms."},
      "defaultBoolean": {"type": "boolean", "title": "A boolean value to default a widget to if not supplied by other mechanisms."},
      "enabled": {"type": "boolean", "title": "Indicates if the user can use the widget to alter the underlying value - default to `true`."},
      "resultLimit": {"type": "number", "title": "For widgets interacting with a search API or similar, configures the maximum number of results that should be returned in any response."},
      "enableUnknownOption": {"type": "boolean", "title": "Should the widget allow the user to indicate they don't know enough detail to find the most suitable result from a search API?"},
      "enableLocationAssist": {"type": "boolean", "title": "If supported by the app, should the widget try to find results from a search API by proximity to the user's current location?"},
      "label": {"type": "string", "title": "A short piece of text to help identify what content is required by the user."},
      "dataPath": {"type": "string", "title": "A path pointing to a key in the data"},
      "labelPath": {"type": "string", "title": "A [JSON Path](https://www.npmjs.com/package/jsonpath) string showing where the _label_ associated with an API call should be stored on the data model. The unique key value selected by the user will be associated as normal with a path inferred from `id` - this is an additional path to store the accompanying label-text (such denormalisation may be useful for 'stamping' labels as they were at time of data-collection and to improve subsequent render-times of the data)."},
      "mandatory": {"type": "boolean", "title": "Indicates if a value needs to be supplied by the user, or if it's optional."},
      "desc": {"type": "string", "title": "Some additional advice (above and beyond the string supplied in `label`) to help define what data is required from the user."},
      "help": {"type": "string", "title": "More detailed guidance/advice (building on top of `description` content) to help shape what data is collected from the user."},
      "captureHistoric": {"type": "boolean", "title": "Can the date/time captured by the widget occur in the past (as starting when the for is submitted)?"},
      "historicByAtLeast": {"type": "string", "title": "A string indicating a period of time that the value supplied by the user must equal or be older than (to be in [ISO duration](http://en.wikipedia.org/wiki/ISO_8601#Durations) format)."},
      "futuristicByAtMost": {"type": "string", "title": "A string indicating a period of time that the value supplied by the user should come before, starting from when the form is submitted (to be in [ISO duration](http://en.wikipedia.org/wiki/ISO_8601#Durations) format)."},
      "columns": {
        "type": "array",
        "title": "An array of objects denoting the columns to be shown on a table",
        "items": {
          "properties": {
            "title": {"type": "string", "title": "The user-facing text that can describe the column"},
            "dataPath": {"type": "string", "title": "The path pointing to where the data can be found for that column"}
          }
        }
      },
      "actions": {
        "type": "array",
        "title": "An array of objects denoting a set of actions the user can take",
        "items": {
          "properties": {
            "title": {"type": "string", "title": "The user-facing text that can describe the action"}
          },
          "required": ["title"]
        }
      },
      "titleMap": {
        "type": "array",
        "title": "An array of objects denoting a set of values that the user can select from.",
        "items": {
          "properties": {
            "value": {"type": "any", "title": "The value that will be provided and saved."},
            "title": {"type": "string", "title": "The user-facing text that can be offered as an alternative to the underlying `value`."},
            "desc": {"type": "string", "title": "Adds more descriptive detail to the title"}
          },
          "additionalProperties": false,
          "required": ["value"]
        }
      },
      "properties": {
        "type": "array",
        "title": "An array of objects with a path to data and title describing the property",
        "items": {
          "properties": {
            "dataPath": {"type": "string", "title": "A path to the data"},
            "header": {"type": "string", "title": "Header to describe the data"}
          }
        }
      }
    },

    "widgets": {

      "address": {
        "title": "Allows the user to _select_ a particular postal address from a provided list and store a unique reference to that property, such as a [UPRN](https://www.ordnancesurvey.co.uk/about/governance/policies/addressbase-uprn.html) or similar.",
        "properties": {
          "type": {"enum": ["address"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "labelPath": {"$ref": "#/definitions/attributes/labelPath"},
              "numericValue": {"$ref": "#/definitions/attributes/numericValue"},
              "resultLimit": {"$ref": "#/definitions/attributes/resultLimit"},
              "enableUnknownOption": {"$ref": "#/definitions/attributes/enableUnknownOption"},
              "enableLocationAssist": {"$ref": "#/definitions/attributes/enableLocationAssist"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "apiLookup": {
        "title": "Allows the user to select a specific value from an API endpoint",
        "properties": {
          "type": {"enum": ["apiLookup"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "apiName": {
                "type": "string",
                "title": "Name of the API endpoint which will be used to get a list of results for the user to select from."
              },
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "numericValue": {"$ref": "#/definitions/attributes/numericValue"},
              "labelPath": {"$ref": "#/definitions/attributes/labelPath"},
              "resultLimit": {"$ref": "#/definitions/attributes/resultLimit"},
              "params": {
                "type": "object",
                "title": "Key/value pairs which will be passed to the API endpoint. As such, contents will vary depending on the API involved."
              }
            },
            "additionalProperties": false,
            "required": ["apiName"]
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "buttonList": {
        "title": "A set of buttons that the user can interact with",
        "properties": {
          "type": {"enum": ["buttonList"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "actions": {"$ref": "#/definitions/attributes/actions"}
            }
          }
        }
      },

      "checkboxList": {
        "title": "Offer a related set of checkboxes with accompanying labels for the user to switch on and off.",
        "properties": {
          "type": {"enum": ["checkboxList"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/default"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "numericValue": {"$ref": "#/definitions/attributes/numericValue"},
              "titleMap": {"$ref": "#/definitions/attributes/titleMap"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "minLimit": {
                "type": "number",
                "default": "0",
                "title": "Minimum number of array elements the user should provide"

              },
              "maxLimit": {
                "type": "number",
                "title": "Maximum number of array elements the user should provide"
              }
            },
            "additionalProperties": false,
            "required": ["titleMap"]
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "date": {
        "title": "Allows the user to provide a specific date - without a time portion.",
        "properties": {
          "type": {"enum": ["date"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "captureHistoric": {"$ref": "#/definitions/attributes/captureHistoric"},
              "historicByAtLeast": {"$ref": "#/definitions/attributes/historicByAtLeast"},
              "futuristicByAtMost": {"$ref": "#/definitions/attributes/futuristicByAtMost"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "dateTime": {
        "title": "Collects a specific date and time from the user.",
        "properties": {
          "type": {"enum": ["dateTime"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "captureHistoric": {"$ref": "#/definitions/attributes/captureHistoric"},
              "futuristicByAtMost": {"$ref": "#/definitions/attributes/futuristicByAtMost"},
              "historicByAtLeast": {"$ref": "#/definitions/attributes/historicByAtLeast"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "time": {
        "title": "Allows the user to provide a specific time (without being tied to a particular date)",
        "properties": {
          "type": {"enum": ["time"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "header": {
        "title": "A widget typically placed at the top of a view to describe its purpose. An optional background image makes this widget akin to a [Hero Unit](https://en.wikipedia.org/wiki/Hero_image) or [Jumbotron](https://getbootstrap.com/docs/4.0/components/jumbotron/).",
        "properties": {
          "type": {"enum": ["header"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "backgroundImage": {"type": "string", "title": "A path to an image file that should be resolved from the app's base image URL or similar."},
              "backgroundImageAltText": {"type": "string", "title": "Text that describes the `backgroundImage` image."}
            },
            "required": ["heading"],
            "additionalProperties": false
          }
        },
        "required": ["type"],
        "additionalProperties": false
      },

      "heading": {
        "title": "Use to displays a heading (with optional descriptive text). Not to be confused with [`header`](#list-header), the `heading` widget equates more to a `<h1></h1>` UI experience.",
        "properties": {
          "type": {"enum": ["heading"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"}
            },
            "required": ["heading"],
            "additionalProperties": false
          }
        },
        "required": ["type"],
        "additionalProperties": false
      },

      "propertyList": {
        "title": "Displays a list of data provided in form of an array",
        "properties": {
          "type": {"enum": ["propertyList"]},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "properties": {"$ref": "#/definitions/attributes/properties"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "questionnaire": {
        "title": "Offers the user a question with two or more possible responses on an appropriate scale.",
        "properties": {
          "type": {"enum": ["questionnaire"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/default"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "numericValue": {"$ref": "#/definitions/attributes/numericValue"},
              "titleMap": {"$ref": "#/definitions/attributes/titleMap"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "subView": {
        "title": "Allows the user to enter a number of 'sub forms' (think order-lines or contact details etc.)",
        "properties": {
          "type": {"enum": ["subView"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "default": {"$ref": "#/definitions/attributes/default"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "createButtonText": {
                "type": "string",
                "title": "Text to put on a button which will create a new entity."
              },
              "minAllowed": {
                "type": "number",
                "title": "The minimum number of sub-views that the user is required to complete."
              },
              "maxAllowed": {
                "type": "number",
                "title": "The maximum number of sub-views that the user can complete."
              },
              "showAtLeastOne": {
                "type": "boolean",
                "title": "If `true` and no sub-views have yet been completed, then the app should show an empty sub-view ready for the user to start entering data (especially useful when `minAllowed > 0`)."
              },
              "singularEntityText": {
                "type": "string",
                "title": "What is _one_ of these forms termed? Consider using it in a sentence such as '_Click here to create a new `${singularEntityText}`._'."
              },
              "instanceHeadingTemplate": {
                "type": "string",
                "title": "A handlebars-like template for conjuring a title per instance."
              },
              "instanceDescTemplate": {
                "type": "string",
                "title": "A handlebars-like template for conjuring a title per instance."
              }
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },


      "radio": {
        "title": "Allows the user to select a value from a set of related options that are rendered in a [Radio Button](https://en.wikipedia.org/wiki/Radio_button) style.",
        "properties": {
          "type": {"enum": ["radio"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "numericValue": {"$ref": "#/definitions/attributes/numericValue"},
              "titleMap": {"$ref": "#/definitions/attributes/titleMap"}
            }
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "richtext": {
        "title": "Offers the user a text editor with functionality to format text.",
        "properties": {
          "type": {"enum": ["richtext"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "default": {"$ref": "#/definitions/attributes/defaultString"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "signature": {
        "title": "Allow the collection of a handwritten signature",
        "properties": {
          "type": {"enum": ["signature"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "image": {
        "title": "Embeds a non-interactive image within the form.",
        "properties": {
          "type": {"enum": ["image"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "image": {"type": "string", "title": "A path to an image file that should be resolved from the app's base image URL or similar."},
              "altText": {"type": "string", "title": "Text that describes the `backgroundImage` image."}

            },
            "additionalProperties": false,
            "required": ["image"]
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "textarea": {
        "title": "Collects simple multi-line text input from the user.",
        "properties": {
          "type": {"enum": ["textarea"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/defaultString"},
              "placeholder": {"$ref": "#/definitions/attributes/placeholder"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "minCharacters": {"$ref": "#/definitions/attributes/minCharacters"},
              "maxCharacters": {"$ref": "#/definitions/attributes/maxCharacters"},
              "help": {"$ref": "#/definitions/attributes/help"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "stickyNote": {
        "title": "A panel for putting helpful text or other informative text",
        "properties": {
          "type": {"enum": ["stickyNote"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "style": {
                "enum": ["normal", "informative", "danger"],
                "title": "Some style pointers that the note should take."
              }
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "map": {
        "title": "Displays a map to the user, and can optionally be configured to collect geo-spatial data (points, lines etc.)",
        "properties": {
          "type": {"enum": ["map"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "centreLatitudePath": {
                "type": "string",
                "title": "Path indicating which property should be used to infer a latitude value when first centering the map"
              },
              "centreLongitudePath": {
                "type": "string",
                "title": "Path indicating which property should be used to infer a longitude value when first centering the map"
              },
              "enableLocationAssist": {"$ref": "#/definitions/attributes/enableLocationAssist"},
              "collectGeometries": {
                "type": "array",
                "items": {
                  "type": "string",
                  "enum": ["points", "lines", "circles", "polygons"]
                }
              },
              "minGeometries": {"type": "number", "title": "The minimum number of geometries required from the user"},
              "maxGeometries": {"type": "number", "title": "The maximum number of geometries required from the user"},
              "pointIconPalette": {
                "type": "array",
                "title": "An array of icons which the user can select from when adding point geometries",
                "items": {
                  "type": "object",
                  "properties": {
                    "file": {"type": "string", "title": "The file name of the point image, like all images, will be resolved from the app's base URL."},
                    "label": {"type": "string", "title": "A short label to accompany the icon, useful when offered from a drag-and-drop palette or similar"}
                  }
                }
              },
              "relatedLayers": {
                "type": "array",
                "title": "An array of layers which the widget should request when rendering maps.",
                "items": {
                  "type": "object",
                  "properties": {
                    "name": {"type": "string", "title": "The name of a layer/overlay that's expected to be available when rendering map content."},
                    "label": {"type": "string", "title": "A short label to accompany the layer, useful for allowing the user to hide/show themselves."},
                    "visibleByDefault": {"type": "boolean", "title": "Should the layer be shown by default when the map first renders?"}
                  }
                }
              },
              "help": {"$ref": "#/definitions/attributes/help"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "fileUpload": {
        "title": "Allows the user to upload a file.",
        "properties": {
          "type": {"enum": ["fileUpload"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "captionPath": {
                "type": "string",
                "title": "A [JSON Path](https://www.npmjs.com/package/jsonpath) string showing where some caption text also provided by the user should be stored on the data model. If this value is not provided, the the widget should not offer captioning of uploads."
              },
              "formatRestriction": {
                "type": "array",
                "title": "An array of strings representing a set of file extensions that are allowed to be uploaded, for example: `[\"jpg\", \"jpeg\"]`.",
                "items": {
                  "type": "string"
                }
              },
              "maxFileSize": {
                "type": "string",
                "title": "A [human2bytes](https://www.npmjs.com/package/human2bytes) compatible string representing the maximum filesize permitted (e.g. `50mb`)."
              },
              "minNumberOfFiles": {
                "type": "number",
                "title": "The minimum number of files that the user is required to upload."
              },
              "maxNumberOfFiles": {
                "type": "number",
                "title": "The maximum number of files that the user is required to upload."
              }
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "set": {
        "title": "Marks the start of a set of related widgets - see the [Sets](#set) section for more information.",
        "properties": {
          "type": {"enum": ["set"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "tocTitle": {"type": "string", "title": "Should the set feature in a table-of-contents or similar, use this title. Note that if no string is specified, it is assumed the set shouldn't be included in a TOC."},
              "tocIcon": {"type": "string", "title": "An icon to accompany tocTitle. For now, Must be something in [Material.io](https://material.io/icons/), e.g. `local_pizza`"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "endSet": {
        "title": "Marks the end of a set of related widgets - see the [Sets](#set) section for more information.",
        "properties": {
          "type": {"enum": ["endSet"]}
        },
        "required": ["type"],
        "additionalProperties": false
      },

      "horizontalLine": {
        "title": "Renders a horizontal line to help split things up (i.e. like a `</hr>`)",
        "properties": {
          "type": {"enum": ["horizontalLine"]}
        },
        "required": ["type"],
        "additionalProperties": false
      },

      "endSubView": {
        "title": "Marks the end of a sub-view - see the [Sets](#set) section for more information.",
        "properties": {
          "type": {"enum": ["endSubView"]}
        },
        "required": ["type"],
        "additionalProperties": false
      },

      "select": {
        "title": "Allows the user to select a value from a set of options, which should be rendered in an [HTML Select](https://en.wikipedia.org/wiki/HTML_element) style.",
        "properties": {
          "type": {"enum": ["select"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "default": {"$ref": "#/definitions/attributes/default"},
              "numericValue": {"$ref": "#/definitions/attributes/numericValue"},
              "titleMap": {"$ref": "#/definitions/attributes/titleMap"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "switch": {
        "title": "Presents a on/off style switch to the user.",
        "properties": {
          "type": {"enum": ["switch"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/defaultBoolean"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "table": {
        "title": "Presents data in format of a table with specified columns.",
        "properties": {
          "type": {"enum": ["table"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "id": {"$ref": "#/definitions/id"},
          "attributes": {
            "type": "object",
            "properties": {
              "help": {"$ref": "#/definitions/attributes/help"},
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "dataPath": {"$ref": "#/definitions/attributes/dataPath"},
              "columns": {"$ref": "#/definitions/attributes/columns"},
              "resultLimit": {"$ref": "#/definitions/attributes/resultLimit"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "text": {
        "title": "A bread-and-butter box for collecting textual information from the user.",
        "properties": {
          "type": {"enum": ["text"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/defaultString"},
              "placeholder": {"$ref": "#/definitions/attributes/placeholder"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "minCharacters": {"$ref": "#/definitions/attributes/minCharacters"},
              "maxCharacters": {"$ref": "#/definitions/attributes/maxCharacters"},
              "help": {"$ref": "#/definitions/attributes/help"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "number": {
        "title": "Like a `text` widget, but specifically for collecting numeric content.",
        "properties": {
          "id": {"type": "string"},
          "type": {"enum": ["number"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/defaultNumber"},
              "minimum": {"$ref": "#/definitions/attributes/minimum"},
              "maximum": {"$ref": "#/definitions/attributes/maximum"},
              "placeholder": {"$ref": "#/definitions/attributes/placeholder"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"}
            }
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "expandableNotice": {
        "title": "Expandable Notice field.",
        "properties": {
          "type": {"enum": ["expandableNotice"]},
          "id": {"$ref": "#/definitions/id"},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "content": {"$ref": "#/definitions/attributes/content"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "help": {"$ref": "#/definitions/attributes/help"}
            },
            "additionalProperties": false
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "currency": {
        "title": "Just like a `number` widget, but for specifically collecting a monetary value.",
        "properties": {
          "id": {"type": "string"},
          "type": {"enum": ["currency"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/defaultString"},
              "placeholder": {"$ref": "#/definitions/attributes/placeholder"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "help": {"$ref": "#/definitions/attributes/help"}
            }
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      },

      "slider": {
        "title": "For capturing a number along a specified range",
        "properties": {
          "id": {"type": "string"},
          "type": {"enum": ["slider"]},
          "showWhen": {"$ref": "#/definitions/showWhen"},
          "attributes": {
            "type": "object",
            "properties": {
              "heading": {"$ref": "#/definitions/attributes/heading"},
              "enabled": {"$ref": "#/definitions/attributes/enabled"},
              "default": {"$ref": "#/definitions/attributes/defaultNumber"},
              "desc": {"$ref": "#/definitions/attributes/desc"},
              "mandatory": {"$ref": "#/definitions/attributes/mandatory"},
              "minimum": {"$ref": "#/definitions/attributes/minimum"},
              "maximum": {"$ref": "#/definitions/attributes/maximum"},
              "help": {"$ref": "#/definitions/attributes/help"},
              "step": {
                "type": "number",
                "title":"The steps/intervals that the slider widget should snap to."
              }
            }
          }
        },
        "required": ["id", "type"],
        "additionalProperties": false
      }
    }
  },

  "type": "object",
  "properties": {

    "title": {
      "type": "string",
      "title": "A short-as-possible label to associate with the form."
    },

    "version": {
      "type": "string",
      "title": "Denotes the current version of the form definition. This will be assigned by whatever tooling and processes conjure your forms. There is a strong preference that form version strings adhere to [Semantic Versioning](http://nodesource.com/blog/semver-a-primer/)."
    },

    "widgets": {
      "type": "array",
      "title": "The main event, 1 or more `widget` objects which an app should render to produce a form.",
      "minItems": 1,
      "items": {
        "type": "object",
        "oneOf": [
          {"$ref": "#/definitions/widgets/address"},
          {"$ref": "#/definitions/widgets/apiLookup"},
          {"$ref": "#/definitions/widgets/checkboxList"},
          {"$ref": "#/definitions/widgets/currency"},
          {"$ref": "#/definitions/widgets/date"},
          {"$ref": "#/definitions/widgets/dateTime"},
          {"$ref": "#/definitions/widgets/time"},
          {"$ref": "#/definitions/widgets/header"},
          {"$ref": "#/definitions/widgets/heading"},
          {"$ref": "#/definitions/widgets/horizontalLine"},
          {"$ref": "#/definitions/widgets/propertyList"},
          {"$ref": "#/definitions/widgets/questionnaire"},
          {"$ref": "#/definitions/widgets/radio"},
          {"$ref": "#/definitions/widgets/richtext"},
          {"$ref": "#/definitions/widgets/signature"},
          {"$ref": "#/definitions/widgets/textarea"},
          {"$ref": "#/definitions/widgets/set"},
          {"$ref": "#/definitions/widgets/endSet"},
          {"$ref": "#/definitions/widgets/select"},
          {"$ref": "#/definitions/widgets/switch"},
          {"$ref": "#/definitions/widgets/text"},
          {"$ref": "#/definitions/widgets/number"},
          {"$ref": "#/definitions/widgets/map"},
          {"$ref": "#/definitions/widgets/fileUpload"},
          {"$ref": "#/definitions/widgets/subView"},
          {"$ref": "#/definitions/widgets/endSubView"},
          {"$ref": "#/definitions/widgets/stickyNote"},
          {"$ref": "#/definitions/widgets/image"}
        ]
      }
    }
  },
  "required": ["widgets"],
  "additionalProperties": false
}

