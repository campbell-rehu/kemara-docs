---
title: Multi-line Editing in Neovim
---

## Getting the field names from a type when initializing

Given the following type:

```ts
type Person { 
  name: string
  email: string
  age: number
  phone?: string
  ...
}
```

When initializing an instance of that type, getting all of the fields to use can be cumbersome (though much less so thanks to IDE plugins and GH Copilot).
So using VIM motions, we can grab the fields off the type, add them to the instance declaration and use some find and replace magic to initialize the fields.

# 1. Select and yank the field names from the type definition

Navigate to the first field inside the type body (e.g., the line with `name: string`).

Enter visual line mode and select down through to the last field:

```
Shift+v    # enter visual line mode
<number>j  # extend selection down over all field lines
```

Yank the selection:

```
y
```

# 2. Paste the fields into the instance declaration

Move the cursor to the line inside the initialization block where the fields should appear, then paste:

```
p
```

The block will now look something like this:

```ts
const person: Person = {
  name: string
  email: string
  age: number
  phone?: string
}
```

# 3. Strip the type annotations

Re-select the pasted lines:

```
gv
```

Run a substitution over the selection to strip the type annotations and add a trailing comma:

```
:'<,'>s/\?: \w\+$/,/
```

The fields will now look like:

```ts
const person: Person = {
  name,
  email,
  age,
  phone,
}
```

# 4. Expand each field to a key-value pair

Re-select the fields and run another substitution to expand the shorthand into initialized key-value pairs:

```
gv
:'<,'>s/\(\w\+\),$/\1: "",/
```

This gives:

```ts
const person: Person = {
  name: "",
  email: "",
  age: "",
  phone: "",
}
```

Note: for non-string fields like `age: number`, you'll need to manually update the default value — e.g., change `""` to `0`.
