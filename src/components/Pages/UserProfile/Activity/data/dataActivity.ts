const dataActivity = [
  {
    icon: 'fi fi-rr-video-plus text-primary',
    content: `
        <h6 class="fw-semibold mb-1">MEETING WITH CLIENT</h6>
        <p>
        Meeting with USA Client, today at
        <a href="#!" data-abc="true">
            12:00 PM
        </a>
        </p>
        <div class="mb-4 hstack gap-1"><span class="badge bg-danger-subtle text-danger border">React</span><span class="badge bg-success-subtle text-success border">TypeScript</span><span class="badge bg-warning-subtle text-warning border">Admin</span><span class="badge bg-primary-subtle text-primary border">Dashboard</span></div>
    `,
  },
  {
    icon: 'fi fi-rr-video-plus text-warning',
    content: `
        <h6 class="fw-semibold mb-1">
            Another meeting with UK client today, at <b class="text-danger">3:00 PM</b>
        </h6>
        <p>
            Yet another one, at <span class="text-success">5:00 PM</span>
        </p>
        <div class="d-grid d-md-flex gap-2"><a class="d-inline-flex align-items-center gap-3 px-4 py-3 rounded border" href="#!"><i class="fi fi-rr-file-zipper text-primary fs-32"></i><div><h6>Dashboard UiKit</h6><p class="fs-12 text-muted mb-0">34.75 MB</p></div></a><a class="d-inline-flex align-items-center gap-3 px-4 py-3 rounded border" href="#!"><i class="fi fi-rr-file-zipper text-primary fs-32"></i><div><h6>Discussion Platform</h6><p class="fs-12 text-muted mb-0">23.48 MB</p></div></a></div>
    `,
  },
  {
    icon: 'fi fi-rr-tags text-info',
    content: `
        <h6 class="fw-semibold mb-1">
            <a href="#!" class="text-primary">
            Alexandra Della
            </a>
            posted a status update
        </h6>
        <p>
            Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered
            prepare how cordial two promise.
        </p>
    `,
  },
  {
    icon: 'fi fi-rr-pen-fancy text-danger',
    content: `
        <h6 class="fw-semibold mb-1">DISCUSSION WITH TEAM ABOUT NEW PRODUCT LAUNCH</h6>
        <p>
            Yet another one, at <span class="text-success">1:00 PM</span>
        </p>
        <div class="avatar-group avatar-group-sm mb-4 hstack gap-1"><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/4.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/1.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/3.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/5.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/6.png" alt="User Avatar" class="img-fluid rounded-undefined"></div></div>
        
    `,
  },
  {
    icon: 'fi fi-rr-marker text-teal',
    content: `
        <h6 class="fw-semibold mb-1">
            <a href="#!">Arlind Nushi</a> checked in at
            <a href="#!" class="text-info">
            New York
            </a>
        </h6>
        <blockquote>
            <p class="fw-light blockquote blockquote-primary">
            "It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout."
            <br />
            <small> - Isabella </small>
            </p>
        </blockquote>
        <p>Discussion with marketing team about the popularity of last product</p>
    `,
  },
  {
    icon: 'fi fi-rr-camera text-warning',
    content: `
        <h6 class="fw-semibold mb-1"><a href="#!">Eroll Maxhuni</a> <span>uploaded</span> 4 <span>new photos to album</span> <a class="text-warning" href="#!">Summer Trip</a></h6><p>Pianoforte principles our unaffected not for astonished travelling are particular.</p>
    `,
  },
  {
    icon: 'fi fi-rr-video-plus text-success',
    content: `
        <h6 class="text-success">Discussion with marketing team</h6><p>You have a meeting at <strong class="text-dark">Laborator Office</strong> Today.</p><p>Discussion with marketing team about the popularity of last product</p>
    `,
  },
  {
    icon: 'fi fi-rr-marker text-info',
    content: `
        <h6 class="fw-semibold mb-1"><a href="#!">Arlind Nushi</a> <span>checked in at</span> <a href="#!">Laborator</a></h6><p>Purchase new hosting plan as discussed with development team, today at <a data-abc="true" href="#!">10:00 AM</a></p>
        <div class="mb-4 hstack gap-1"><span class="badge bg-danger-subtle text-danger border">React</span><span class="badge bg-success-subtle text-success border">TypeScript</span><span class="badge bg-warning-subtle text-warning border">Admin</span><span class="badge bg-primary-subtle text-primary border">Dashboard</span></div>
    `,
  },
  {
    icon: 'fi fi-rr-mode-portrait text-dark',
    content: `
        <h6 class="fw-semibold mb-1">Another conference call today, at <b class="text-danger">11:00 AM</b></h6><p>Yet another one, at <span class="text-success">1:00 PM</span></p>
    `,
  },
  {
    icon: 'fi fi-rr-tags text-info',
    content: `
        <h6 class="fw-semibold mb-1">
            <a href="#!" class="text-primary">
            Alexandra Della
            </a>
            posted a status update
        </h6>
        <p>
            Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered
            prepare how cordial two promise.
        </p>
    `,
  },
  {
    icon: 'fi fi-rr-pen-fancy text-danger',
    content: `
        <h6 class="fw-semibold mb-1">DISCUSSION WITH TEAM ABOUT NEW PRODUCT LAUNCH</h6>
        <p>
            Yet another one, at <span class="text-success">1:00 PM</span>
        </p>
        <div class="avatar-group avatar-group-sm mb-4 hstack gap-1"><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/4.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/1.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/3.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/5.png" alt="User Avatar" class="img-fluid rounded-undefined"></div><div class="avatar avatar-sm"><img src="/src/assets/images/avatars/6.png" alt="User Avatar" class="img-fluid rounded-undefined"></div></div>
        
    `,
  },
  {
    icon: 'fi fi-rr-marker text-teal',
    content: `
        <h6 class="fw-semibold mb-1">
            <a href="#!">Arlind Nushi</a> checked in at
            <a href="#!" class="text-info">
            New York
            </a>
        </h6>
        <blockquote>
            <p class="fw-light blockquote blockquote-primary">
            "It is a long established fact that a reader will be distracted by the readable
            content of a page when looking at its layout."
            <br />
            <small> - Isabella </small>
            </p>
        </blockquote>
        <p>Discussion with marketing team about the popularity of last product</p>
    `,
  },
  {
    icon: 'fi fi-rr-camera text-warning',
    content: `
        <h6 class="fw-semibold mb-1"><a href="#!">Eroll Maxhuni</a> <span>uploaded</span> 4 <span>new photos to album</span> <a class="text-warning" href="#!">Summer Trip</a></h6><p>Pianoforte principles our unaffected not for astonished travelling are particular.</p><button type="button" class="btn-neutral btn"><i class="fi fi-br-plus fs-10"></i><span class="ms-2">New Message</span></button>
    `,
  },
  {
    icon: 'fi fi-rr-video-plus text-success',
    content: `
        <h6 class="text-success">Discussion with marketing team</h6><p>You have a meeting at <strong class="text-dark">Laborator Office</strong> Today.</p><p>Discussion with marketing team about the popularity of last product</p>
    `,
  },
  {
    icon: 'fi fi-rr-marker text-info',
    content: `
        <h6 class="fw-semibold mb-1"><a href="#!">Arlind Nushi</a> <span>checked in at</span> <a href="#!">Laborator</a></h6><p>Purchase new hosting plan as discussed with development team, today at <a data-abc="true" href="#!">10:00 AM</a></p>
        <div class="mb-4 hstack gap-1"><span class="badge bg-danger-subtle text-danger border">React</span><span class="badge bg-success-subtle text-success border">TypeScript</span><span class="badge bg-warning-subtle text-warning border">Admin</span><span class="badge bg-primary-subtle text-primary border">Dashboard</span></div>
    `,
  },
  {
    icon: 'fi fi-rr-mode-portrait text-dark',
    content: `
        <h6 class="fw-semibold mb-1">Another conference call today, at <b class="text-danger">11:00 AM</b></h6><p>Yet another one, at <span class="text-success">1:00 PM</span></p>
    `,
  },
]

export default dataActivity
