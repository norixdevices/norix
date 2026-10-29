
    event.preventDefault();
    const formData = new FormData(contactForm);
    const subject = `NORIX enquiry from ${formData.get('name')}`;
    const body = [
      `Name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone')}`,
      '',
      'Enquiry:',
      formData.get('message'),
    ].join('\n');
    formStatus.dataset.state = 'error';
    formStatus.textContent = 'Your details were not sent. Connect this form to your enquiry service before publishing.';
    formStatus.dataset.state = 'ready';
    formStatus.textContent = 'Your email app should open with a draft. Review it and send it to complete your enquiry.';
    window.location.href = `mailto:Norixdevices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });