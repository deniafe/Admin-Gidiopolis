import React, { useEffect, useRef } from 'react';

// interface DataTableProps {
//   columns: (string | { label: string; field: string })[];
//   rows: (string | number)[][];
// }

const DataTable = () => {
  const dataTableRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const data = {
    columns: [
      { label: "Name", field: "name" },
      { label: "Email", field: "email" },
      { label: "Status", field: "status" },
      { label: "Joined Date", field: "date" },
      { label: "Action", field: "action", sort: false },
    ],
    rows: [
      {
        id: "id1",
        name: "Tiger Nixon",
        email: "tiger.nixon@gmail.com",
        status: "Activated",
        date: "24 Aug 2023",
      },
      {
        id: "id2",
        name: "Sonya Frost",
        email: "sfrost@gmail.com",
        status: "Activated",
        date: "24 Aug 2023",
      },
      {
        id: "id3",
        name: "Tatyana Fitzpatrick",
        email: "tfitz@gmail.com",
        status: "Activated",
        date: "24 Aug 2023",
      },
    ].map((row, i) => {
      return {
        ...row,
        action: `
        <div class="flex">
          <a role="button" class="edit-btn star-email-button text-neutral-300" data-te-index="${row.id}">
            <svg  viewBox="0 0 32 32" width="24px" height="24px">
              <path fill="currentColor" d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z"/>
            </svg>
          </a>
          <a 
            data-te-toggle="modal"
            data-te-target="#confirmDelete"
            data-te-ripple-init
            data-te-ripple-color="light"
            role="button" class="delete-btn delete-email-button text-neutral-300 ms-2 mr-2" data-te-index="${row.id}">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </a>
          <a
            role="button"
            data-te-index="${row.id}"
            class="view-btn inline-block rounded-full ml-1 border-2 border-primary-100 px-6 pb-[2px] pt-1 text-xs font-medium uppercase leading-normal text-my-primary transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10">
              View
          </a>
        </div>`,
      };
    }),
  };

  let instance: any


  const handleSearchInput = (e: any) => {
    const inputValue = e.target?.value; // Use optional chaining here
    if (inputValue) {
      instance.search(inputValue);
    }
  }

  useEffect(() => {
    const init = async () => {
      const { Datatable, initTE } = await import("tw-elements");
      initTE({ Datatable});
      instance = new Datatable(document.getElementById('datatable'), data, { hover: true })
    };
    init();
  }, []);

  useEffect(() => {
    const customDatatable = document.getElementById("datatable");

    const setActions = () => {

      document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const index = btn.getAttribute("data-te-index");
          console.log(`edit user ${index}`);
        });
      });

      document.querySelectorAll(".view-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const index = btn.getAttribute("data-te-index");
          console.log(`view user ${index}`);
        });
      });

      document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const index = btn.getAttribute("data-te-index");
          console.log(`delete user ${index}`);
          const modal = document.getElementById("confirmDelete");
        });
      });
      

    };

    customDatatable?.addEventListener("render.te.datatable", setActions);

  })

  return (
    <div className="mb-3">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          id="datatable-search-input"
          ref={searchInputRef}
          onInput={handleSearchInput}
          type="search"
          className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="button-addon1"
        />
      </div>
      <div 
        id="datatable" 
        ref={dataTableRef}
        data-te-clickable-rows="true"
        data-te-selectable="true"
        data-te-multi="true"
      ></div>
    </div>
  );
};

export default DataTable;
