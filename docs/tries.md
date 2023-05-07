---
title: Implementing Tries in Golang
---

<img alt="AI generated image with the prompt: a trie data structure in pixar animation style" src="/img/a_trie_data_structure_in_pixar_animation_style.png" width="500px"/>

# Background

I was recently introduced to this github repo: https://github.com/codecrafters-io/build-your-own-x and decided to give one of the tutorials a go.

I chose this one to do with [Building your own Database from scratch](https://build-your-own.org/database/). According to the tutorial, I learned that tree data structures are the preferred choice of data structure to implement a database.

I decided to do a brief side-quest into tree data structures and came across the [Trie](https://en.wikipedia.org/wiki/Trie) which I found most fascinating because one use-case of Tries is in text autocompletion.

With this in mind, I decided to try and implement a trie data structure in Golang with the aim being to get simple text autocompletion working in the command line.

# Repo

All of the code for this project can be found [here](https://github.com/campbell-rehu/trie-implementation).

# Writing Golang

I have used Golang in a previous job and so I wanted to refresh my memory of the language and it was quite a joyful reunion. From the simplicity of the syntax, to the ease of running and building it, I thoroughly enjoyed getting involved with it again.

# What are Tries?

Through watching some YouTube videos about the theory behind Tries, I learned that a Trie is made up of a collection of `Node`s with each node having three properties:

1. the Character that it represents
2. a collection of Nodes that represent its children
3. a flag indicating whether the Node was a terminating node and formed a complete word with its parent nodes e.g for the word `CAR`, the Node holding the letter `R` would have this flag set to `true`.

So I started with the type `Node`:

```golang
type Node struct {
    Char string
    Children map[string]*Node
    CompleteWord bool
}
```

Then I added a type for the actual `Trie`:

```golang
type Trie struct {
    RootNode *Node
    Words []string
}
```

The `Trie` type is made up of:

1. a `RootNode` which represented the very first Node in the tree and would hold the character `"*"`
2. a list of `Words` to which the words that matched the input characters could be stored and retrieved later
   - Note: this was the simplest way I could find to get the complete words out but I'd like to explore an alternate approach in the future perhaps using channels instead.

# Adding a word to the Trie

To add a complete word to a Trie, I added these functions:

```golang
func (t *Trie) AddWord(word string) {
	node := t.RootNode
	for i := 0; i < len(word); i++ {
		isLastChar := i == len(word) - 1
		char := string(word[i])
		_, ok := node.Children[char]
		if (!ok) {
			// Add new Node if it doesn't exist
			node.Children[char] = CreateNewNode(char, make(map[string]*Node), isLastChar)
		}
		node = node.Children[char]
	}
}

func CreateNewNode(char string, children map[string]*Node, completeWord bool) *Node {
	return &Node{
		Char:         char,
		Children:     children,
		CompleteWord: completeWord,
	}
}
```

The `AddWord` function loops through the input word and looks for the character in the list of child Nodes on the current Node starting from the `RootNode`.

If the letter is not one of the current `Node`'s children, it gets added and then that new `Node` becomes the current `Node`.

If the letter is already one of the current `Node`'s children, we just set that existing `Node` as the current `Node` and continue with the next letter in the input word.

When creating a new child `Node`, we set the `CompleteWord` value to whether the character in the last in the input word.

# Retrieving the list of available words

To retrieve a list of words for a given input of one character or more, I added this function:

```golang
func (t *Trie) GetWord(word string, node *Node) {
	if node.CompleteWord {
		t.Words = append(t.Words, word)
	}
	for char, childNode := range node.Children {
		t.GetWord(word + char, childNode)
	}
}
```

`GetWord` loops through the children of the input `Node` and passes the original input word plus the child `Node`'s character back to the `GetWord` function. It would do this until the input `Node`'s `CompleteWord` field was `true`.

The function would continue to traverse that `Node`'s child `Node`s because there could be additional complete words that follow with additional characters e.g. if the Trie contained the words `CAR` and `CARD`, with an input word of `CA`, the words `CAR` and `CARD` would need to be returned because they are both complete words.

# Putting it all together

There were some additional helper functions and it was all wrapped around keyboard event handling but for simplicity, the crux of functionality was in the following lines:

```golang
func main() {
// Excluded for brevity
word := strings.Join(chars, "")
node := trie.RootNode.Children[chars[0]].GetChildNode(word)
trie.GetWord(word, node)

fmt.Println(strings.Join(chars, ""), "\n Autocomplete options: ", strings.Join(trie.Words, ", "))
}

func (n *Node) GetChildNode(word string) *Node {
	if len(word) == 1 {
		return n
	}
	return n.Children[string(word[1])].GetChildNode(word[1:])
}
```

In this code, `chars` was a list of all of the characters input by the user via the keyboard. Since multiple characters could be input, we combined them into a single "word".

Then, we started at the root `Node` and retrieved the child `Node` corresponding to the first letter of our word.

From this node we retrieved the "child-most" `Node` for the given word e.g. given the input word `CAR`, we would want the `Node` holding the letter `R`. We did this because we wanted to return all of the words that started with the prefix `CAR`, so if the words `CARD` and `CART` were in the Trie, we would want to return those two words.

Finally, we would call the `trie.GetWord` function using that "child-most" `Node` to set `trie.Words` to the correct list of words based on the input.

# Learnings & Conclusion

Overall, this project has been an enjoyable experience. It was great to get back into Golang and learning about tries was interesting.

I think this project struck the right balance of being challenging enough to feel like I was learning new things and growing; having some familiarity and rediscovery in using Golang; and it being a solution to a real-world problem.

This project has definitely spurred my interest in data structures and their different applications in a way that I never felt whilst learning about them at university. It almost feels like I wasn't given the right context to think about things like data structures or algorithms while I was studying and it feels nice to have things click in to place like this.

I'm considering building implementations of stacks, queues, and heaps in the future and maybe explore a language I'm less familiar with like python or even rust.
