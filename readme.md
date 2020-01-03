# Hangman of Fortune

First javaScript homework for full stack development bootcamp UT-Austin (UT-VIRT-FSF-PT-11-2019-U-LOL)

A simple hangman word guess game gone awry...

## Specifications

* Have a theme, use listeners for the letters that your players will type.
* Keep track and display: wins/losses, guessed/unguessed letters and guesses remaining.
* Reveal letters as guessed, loop through multiple puzzles.

TODO: Describe the installation process

## Usage

TODO: Write usage instructions

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license



A homework project for my full stack development bootcamp, a relatively simple hangman game morphed into something a bit more complicated. I have a habit of applying new concepts as I begin to grasp them in order to gain an understanding of practical usage. Here&#39;s a basic outline of the adventure…



Things went a bit off the rails when I decided to morph hangman with wheel of fortune… Items of note:

* Hangman stick animation is done with CSS manipulation (display, z-index and visibility)

* The spinning wheel is CSS animation utilizing a CSS variable for locating.

* Spins locations are determined via a weighted random generator (roulette algorithm – taken from pseudo-code posted on Stack Overflow for c++). There is a second randomizer that determines the actual slot, if more than one of the same values exist.

* Multi-dimensional arrays were used in letter object for a visibility flag, wheel slot locations in degrees and the audio sound effects key.

* Bootstrap was used for nav-bar, keyboard buttons and footer

* Game elements are objects (game, puzzle, letters and wheel)

* Created a reusable js library (includeLib.js) for functions I may need in other projects:

  - * randomIndex(x) – returns an array of numbers of x length (from 0 to x-1) in random order (used for randomizing an array of x.length)
  - * rndWeighted(arrOfWeights[]) –  returns a single random element arrOfWeights[] based on weighting.
  - .getVowels(xStr) – returns (str) containing one instance of every vowel in xStr
  - .totalWords(xStr) –  returns (int) total number of words in xStr
  - .totalLetters(xStr) – returns (int) total times letter occurs in xStr
  - .uniqueString(xStr) – returns (str) containing the unique chars in xStr
  - .arrSum(arr[]) – returns the sum of all elements of arr[]