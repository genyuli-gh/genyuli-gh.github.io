(function () {
  const content = window.SITE_CONTENT || {};

  function setText(selector, text) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = text || "";
    });
  }

  function clearAndAppend(element, children) {
    element.replaceChildren(...children);
  }

  function paragraph(text) {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }

  function createLink(link, className) {
    const anchor = document.createElement("a");
    anchor.textContent = link.label;
    anchor.href = link.url || "#";
    if (className) {
      anchor.className = className;
    }
    if (anchor.hostname && anchor.hostname !== window.location.hostname) {
      anchor.rel = "noreferrer";
    }
    return anchor;
  }

  function renderProfile() {
    const profile = content.profile || {};
    const name = profile.name || "Your Name";

    setText("[data-profile-name]", name);
    setText("[data-profile-title]", profile.title || "");
    document.title = name;

    const description = document.querySelector("meta[name='description']");
    if (description && profile.intro && profile.intro.length) {
      description.setAttribute("content", profile.intro[0]);
    }

    const intro = document.querySelector("[data-profile-intro]");
    if (intro) {
      const paragraphs = (profile.intro || []).map(paragraph);
      clearAndAppend(intro, paragraphs);
    }

    const links = document.querySelector("[data-profile-links]");
    if (links) {
      clearAndAppend(links, (profile.links || []).map((link) => createLink(link)));
    }

    const cvUrl = content.cvUrl || "assets/cv.pdf";
    document.querySelectorAll("[data-cv-link]").forEach((link) => {
      link.href = cvUrl;
    });

    const portrait = profile.portrait || {};
    const image = document.querySelector("[data-profile-portrait]");
    const placeholder = document.querySelector("[data-portrait-placeholder]");
    const caption = document.querySelector("[data-profile-caption]");

    if (image && portrait.src) {
      image.src = portrait.src;
      image.alt = portrait.alt || "";
      image.hidden = false;
      if (placeholder) {
        placeholder.hidden = true;
      }
    }

    if (caption) {
      caption.textContent = portrait.caption || "";
    }
  }

  function renderPaperList(selector, papers, emptyText) {
    const container = document.querySelector(selector);
    if (!container) {
      return;
    }

    if (!papers || papers.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = emptyText;
      clearAndAppend(container, [empty]);
      return;
    }

    const entries = papers.map((paper) => {
      const article = document.createElement("article");
      article.className = "paper-entry";

      const title = document.createElement("h4");
      if (paper.url) {
        title.appendChild(createLink({ label: paper.title, url: paper.url }));
      } else {
        title.textContent = paper.title;
      }
      article.appendChild(title);

      const metaParts = [paper.coauthors, paper.status, paper.venue, paper.date].filter(Boolean);
      if (metaParts.length) {
        const meta = document.createElement("p");
        meta.className = "entry-meta";
        meta.textContent = metaParts.join(" | ");
        article.appendChild(meta);
      }

      if (paper.abstract) {
        const details = document.createElement("details");
        const summary = document.createElement("summary");
        summary.textContent = "Abstract";
        details.appendChild(summary);
        details.appendChild(paragraph(paper.abstract));
        article.appendChild(details);
      }

      if (paper.links && paper.links.length) {
        const links = document.createElement("div");
        links.className = "entry-links";
        paper.links.forEach((link) => links.appendChild(createLink(link, "small-link")));
        article.appendChild(links);
      }

      return article;
    });

    clearAndAppend(container, entries);
  }

  function renderResearch() {
    const research = content.research || {};
    setText("[data-research-summary]", research.summary || "");
    renderPaperList(
      "[data-working-papers]",
      research.workingPapers || [],
      "Working papers will be listed here."
    );
    renderPaperList(
      "[data-publications]",
      research.publications || [],
      "No published or forthcoming papers yet."
    );
  }

  function renderLectureNotes() {
    const notes = content.lectureNotes || {};
    setText("[data-notes-summary]", notes.summary || "");

    const container = document.querySelector("[data-lecture-notes]");
    if (!container) {
      return;
    }

    const items = notes.items || [];
    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty-state";
      empty.textContent = "Lecture notes will be listed here.";
      clearAndAppend(container, [empty]);
      return;
    }

    const entries = items.map((note) => {
      const article = document.createElement("article");
      article.className = "note-entry";

      const title = document.createElement("h3");
      title.appendChild(createLink({ label: note.title, url: note.url || "#" }));
      article.appendChild(title);

      const metaParts = [note.course, note.date].filter(Boolean);
      if (metaParts.length) {
        const meta = document.createElement("p");
        meta.className = "entry-meta";
        meta.textContent = metaParts.join(" | ");
        article.appendChild(meta);
      }

      if (note.description) {
        article.appendChild(paragraph(note.description));
      }

      return article;
    });

    clearAndAppend(container, entries);
  }

  function renderFooter() {
    const updated = document.querySelector("[data-last-updated]");
    if (updated && content.lastUpdated) {
      updated.textContent = "Last updated: " + content.lastUpdated;
    }
  }

  renderProfile();
  renderResearch();
  renderLectureNotes();
  renderFooter();
})();
