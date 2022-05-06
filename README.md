### TO DO LIST

- [x] Hoàn thành API Jira
- [ ] Hoàn thành giao diện và các chức năng Cyberbugs
- [ ] Chỉnh keys trong children component khi render bằng map

In short, here's when you can safely use the index as key:
- The array is static and will never change.
- The array is never filtered (display a subset of the array).
- The array is never reordered.
- The array is used as a stack or LIFO (last in, first out). In other words, adding can only be done at the end of the array (i.e push), and only the last item can ever be removed (i.e pop).
<details>
  <summary><b>Using the key prop</b></summary>

-   Bad (Potentially)

```javascript
<tbody>
    {rows.map((row, i) => {
        return <ObjectRow key={i} />;
    })}
</tbody>
```

-   Very bad

```javascript
<tbody>
    {rows.map((row) => {
        return <ObjectRow key={Math.random()} />;
    })}
</tbody>
```

-   Very good

```javascript
<tbody>
    {rows.map((row) => {
        return <ObjectRow key={row.uniqueId} />;
    })}
</tbody>
```

-   Good

```javascript
componentWillMount() {
  let rows = this.props.rows.map(item => { 
    return {uid: SomeLibrary.generateUniqueID(), value: item};
  });
}

...

<tbody>
    {rows.map((row) => {
        return <ObjectRow key={row.uid} />;
    })}
</tbody>
```

</details>

- [ ] Sorting strings with accented characters
<details>
  <summary><b>There are two ways to overcome this behavior localeCompare and Intl</b></summary>

-   Bad 

```javascript
// Spanish
['único','árbol', 'cosas', 'fútbol'].sort();
// ["cosas", "fútbol", "árbol", "único"] // bad order

// German
['Woche', 'wöchentlich', 'wäre', 'Wann'].sort();
// ["Wann", "Woche", "wäre", "wöchentlich"] // bad order
```

-   Using localeCompare()

```javascript
['único','árbol', 'cosas', 'fútbol'].sort(function (a, b) {
  return a.localeCompare(b);
});
// ["árbol", "cosas", "fútbol", "único"]

['Woche', 'wöchentlich', 'wäre', 'Wann'].sort(function (a, b) {
  return a.localeCompare(b);
});
// ["Wann", "wäre", "Woche", "wöchentlich"]
```

-   Using Intl.Collator()

```javascript
['único','árbol', 'cosas', 'fútbol'].sort(Intl.Collator().compare);
// ["árbol", "cosas", "fútbol", "único"]

['Woche', 'wöchentlich', 'wäre', 'Wann'].sort(Intl.Collator().compare);
// ["Wann", "wäre", "Woche", "wöchentlich"]
```

According to Firefox Intl.Collator is faster when comparing large numbers of strings.

</details>