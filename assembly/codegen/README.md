# codegen

This is the implementation of `Preprocessor`.
Its main functions are to generate `metadata.json` and expand annotations to real code.

**Annotations Supported**
* @contract
* @storage
* @message(mutetes = false, selector = "xx")
* @constructor

**Annotations Doing**
* @storage { @ignore @packed }
* @message { payable}
* @event { @topic }
* @doc

