<script>
  // @ts-nocheck

  export let authors;

  function selectAuthor(event) {
    // JavaScript provides an event "target" with each event.
    console.debug(event.target);
    
    // Problem is, if there are "child" elements inside of the intended
    // target, event.target might contain a child. Here, it will always
    // contain the <td> "child", when what we want is the <tr> "parent".
    // Fortunately, JavaScript sets the `this` keyword in events to
    // the DOM element that issued the event. In this case, the on:click
    // is on the <tr> so `this` will always give us the <tr>. Yeah!

    let clickedRow = this;

    // HTML elements can have arbitrary attributes assigned to them using
    // `data-` as a prefix. Below, I set the authorId of each row in a 
    // `data-author-id` value. In JavaScript, you can get this value by
    // looking in the element's dataset object. JavaScript converts `-`
    // separated words into camel case. So:

    let authorId = clickedRow.dataset.authorId;

    // Now finally we just want to navigate to the author details page
    // using the authorId to set the "slug" value.

    window.location.href = `/authors/${authorId}`;
  }

  // Prisma returns an aggregate count as a sub-object. This doesn't work will
  // for how I want to sort things. So I'm going to "flatten" things.
  // `author._count.books` will become `author.bookCount`
  //
  // ALSO, I don't like that the "null" value for "alive" authors will sort
  // as the EARLIEST year of death. Should be the opposite. So I'll replace
  // a null year of death with `9999`, which will properly sort. Then below,
  // I will replace `9999` with "" so that the DISPLAY of the table doesn't
  // look stupid.
  
  for (let author of authors) {
    author.bookCount = author._count.books;
    author.yearOfDeath = author.yearOfDeath ?? 9999;
  }

  const sortColumn = {
    LAST: 'lastName',
    FIRST: 'firstName',
    BORN: 'yearOfBirth',
    DIED: 'yearOfDeath',
    COUNT: 'bookCount'
  }
  const sortOrder = {
    ASC: 1,
    DESC: 2
  }

  let currentSortColumn = sortColumn.LAST;
  let currentSortOrder = sortOrder.DESC;

  function sort() {
    // Our goal is to sort the authors array based on a currentSortColumn
    // and currentSortOrder. First we'll need to update these two values
    // based on the "click" event that triggered this here sort() function.

    // First, get the column that the user clicked on
    
    let sortColumn = this.dataset.sortCol;

    // Now, toggle the sort order, but if the sort column changes
    // set it to descending.
    if (sortColumn == currentSortColumn) {
      if (currentSortOrder == sortOrder.DESC) {
        currentSortOrder = sortOrder.ASC;
      } else {
        currentSortOrder = sortOrder.DESC;
      }
    } else {
      currentSortColumn = sortColumn;
      currentSortOrder = sortOrder.DESC;
    }
    console.debug(currentSortColumn);
    console.debug(currentSortOrder);

    // We can now create a "comparator" function that will compare the correct
    // column values.

    let sortfunc = (colA,colB) => {
      if (currentSortOrder == sortOrder.ASC) {
        return colA[currentSortColumn] < colB[currentSortColumn] ? 1 : -1;
      } else {
        return colA[currentSortColumn] < colB[currentSortColumn] ? -1 : 1;
      }
    }

    // And FINALLY we can actually sort the array.

    authors.sort(sortfunc);

    // BUT, now we gotta do this to force Svelte to redraw the table.
    // https://svelte.dev/tutorial/updating-arrays-and-objects

    authors = [...authors];
  }

</script>

<nav class="d-none d-sm-block" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item">Browse</li>
  </ol>
</nav>

<h1>Our Authors</h1>

<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col"><span role="button" on:click={sort} data-sort-col={sortColumn.LAST}>Last Name</span></th>
      <th scope="col"><span role="button" on:click={sort} data-sort-col={sortColumn.FIRST}>First Name</span></th>
      <th scope="col"><span role="button" on:click={sort} data-sort-col={sortColumn.BORN}>Year Born</span></th>
      <th scope="col"><span role="button" on:click={sort} data-sort-col={sortColumn.DIED}>Year Died</span></th>
      <th scope="col"><span role="button" on:click={sort} data-sort-col={sortColumn.COUNT}>Number of Books</span></th>
    </tr>
  </thead>
  <tbody>
  {#each authors as author}
    <tr role="button" data-author-id={author.authorId} on:click={selectAuthor}>
      <td>{author.lastName}</td>
      <td>{author.firstName}</td>
      <td>{author.yearOfBirth}</td>
      <td>{author.yearOfDeath == 9999 ? "" : author.yearOfDeath}</td>
      <td>{author.bookCount}</td>
    </tr>
  {/each}
  <tbody>
</table>
