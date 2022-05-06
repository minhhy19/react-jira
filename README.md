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
