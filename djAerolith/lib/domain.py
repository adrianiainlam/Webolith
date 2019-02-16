import json
import random
import sys


def stdout_encode(u, default='UTF8'):
    if sys.stdout.encoding:
        return u.encode(sys.stdout.encoding)
    return u.encode(default)


class Word:
    def __init__(self, word, alphagram=None, definition=None, front_hooks=None,
                 back_hooks=None, inner_front_hook=None, inner_back_hook=None,
                 lexicon_symbols=None):
        self.word = word
        self.alphagram = alphagram
        # Disallow None, to keep compatibility with old code.
        self.definition = definition or ''
        self.front_hooks = front_hooks or ''
        self.back_hooks = back_hooks or ''
        self.lexicon_symbols = lexicon_symbols or ''
        self.inner_front_hook = True if inner_front_hook == 1 else False
        self.inner_back_hook = True if inner_back_hook == 1 else False

    def __repr__(self):
        return stdout_encode(self.__str__())

    def __str__(self):
        return '{%s}' % self.word

    def __eq__(self, other):
        return self.word == other.word


class Alphagram:
    def __init__(self, alphagram, probability=None, combinations=None):
        self.alphagram = alphagram
        self.probability = probability
        self.length = len(alphagram)
        self.combinations = combinations

    def __eq__(self, other):
        return self.alphagram == other.alphagram

    def __ne__(self, other):
        return not self.__eq__(other)

    def __repr__(self):
        return stdout_encode(self.__str__())

    def __str__(self):
        return '{%s} (%s)' % (self.alphagram, self.probability)


class Questions:
    def __init__(self):
        self.questions = []
        self.build_mode = False

    def questions_array(self):
        return self.questions

    def set_build_mode(self):
        self.build_mode = True

    def append(self, question):
        self.questions.append(question)

    def extend(self, questions):
        self.questions.extend(questions.questions)

    def truncate(self, n):
        self.questions = self.questions[:n]

    def size(self):
        return len(self.questions)

    def __len__(self):
        return self.size()

    def __getitem__(self, key):
        return self.questions[key]

    def shuffle(self):
        random.shuffle(self.questions)

    def clear(self):
        self.questions = []

    def to_python(self):
        return [q.to_python() for q in self.questions]

    def to_json(self):
        return json.dumps(self.to_python())

    def set_from_json(self, json_string):
        """
        Set Questions from a JSON string. Useful when loading from a
        challenge. We will be missing meta info as this only loads
        words and alphagram strings.

        """
        qs = json.loads(json_string)
        self.set_from_list(qs)

    def set_from_list(self, qs):
        """
        Set Questions from a Python list, that looks like
        [{'q': 'ABC', 'a': ['CAB']}, ... ]

        """
        self.clear()
        for q in qs:
            question = Question()
            question.set_from_obj(q)
            self.append(question)

    def sort_by_probability(self):
        self.questions.sort(key=lambda q: q.alphagram.probability)

    def alphagram_string_set(self):
        return set(self.alphagram_string_list())

    def alphagram_string_list(self):
        return [a.alphagram.alphagram for a in self.questions]

    def __repr__(self):
        return stdout_encode(self.__str__())

    def __str__(self):
        return '{<Questions %s>}' % self.questions


class Question:
    def __init__(self, alphagram=None, answers=None):
        """
        alphagram - An Alphagram object.
        answers - A list of Word objects. see word_db_helper.py

        """
        self.alphagram = alphagram
        self.answers = answers

    def set_answers_from_word_list(self, word_list):
        self.answers = []
        for word in word_list:
            self.answers.append(Word(word=word))

    def to_python_full(self):
        """ A complete representation of question. """
        q = {
            'question': self.alphagram.alphagram,
            'probability': self.alphagram.probability,
            'answers': []
        }
        for a in self.answers:
            q['answers'].append({
                'word': a.word,
                'def': a.definition,
                'f_hooks': a.front_hooks,
                'b_hooks': a.back_hooks,
                'symbols': a.lexicon_symbols,
                'f_inner': a.inner_front_hook,
                'b_inner': a.inner_back_hook
            })
        return q

    def to_python(self):
        return {'q': self.alphagram.alphagram,
                'a': [w.word for w in self.answers]}

    def set_from_obj(self, obj):
        self.alphagram = Alphagram(obj['q'])
        self.set_answers_from_word_list(obj['a'])

    def __repr__(self):
        return stdout_encode(self.__str__())

    def __str__(self):
        return '<Question: %s (%s)>' % (self.alphagram,
                                        self.answers)
