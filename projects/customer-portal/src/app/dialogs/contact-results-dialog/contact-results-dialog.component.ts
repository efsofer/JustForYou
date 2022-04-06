import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-results-dialog',
  templateUrl: './contact-results-dialog.component.html',
  styleUrls: ['./contact-results-dialog.component.scss']
})
export class ContactResultsDialogComponent implements OnInit {
  display = false;
  cols: any;
  tableData = [
    {
      name: 'שמואל תורגמן',
      id: 12365478,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד גלעד שי',
      id: 32365478,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '02/06/2005',
      birthDate: '15/04/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'שלמה קרסנר',
      id: 22365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '02/06/2005',
      birthDate: '25/07/2018',
      city: 'רעננה'
    },
    {
      name: 'שלומי זעירא',
      id: 42365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '02/06/2005',
      birthDate: '12/09/2018',
      city: 'מגדל משה'
    },
    {
      name: 'חיים מוסקוביץ',
      id: 123623478,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '02/06/2005',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      id: 82365478,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '02/06/2005',
      birthDate: '08/08/2020',
      city: 'אילת'
    },
    {
      name: 'גלי אפשטיין',
      id: 32365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '02/06/2005',
      birthDate: '20/12/2020',
      city: 'תל אביב'
    },
    {
      name: 'יפעת מלכא',
      id: 52365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '25/07/2019',
      city: 'ירושלים'
    },
    {
      name: 'שמואל תורגמן',
      id: 12365478,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד גלעד שי',
      id: 32365478,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '02/06/2005',
      birthDate: '15/04/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'שלמה קרסנר',
      id: 22365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '02/06/2005',
      birthDate: '25/07/2018',
      city: 'רעננה'
    },
    {
      name: 'שלומי זעירא',
      id: 42365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '02/06/2005',
      birthDate: '12/09/2018',
      city: 'מגדל משה'
    },
    {
      name: 'חיים מוסקוביץ',
      id: 123623478,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '02/06/2005',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      id: 82365478,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '02/06/2005',
      birthDate: '08/08/2020',
      city: 'אילת'
    },
    {
      name: 'גלי אפשטיין',
      id: 32365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '02/06/2005',
      birthDate: '20/12/2020',
      city: 'תל אביב'
    },
    {
      name: 'יפעת מלכא',
      id: 52365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '25/07/2019',
      city: 'ירושלים'
    },
    {
      name: 'שמואל תורגמן',
      id: 12365478,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד גלעד שי',
      id: 32365478,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '02/06/2005',
      birthDate: '15/04/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'שלמה קרסנר',
      id: 22365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '02/06/2005',
      birthDate: '25/07/2018',
      city: 'רעננה'
    },
    {
      name: 'שלומי זעירא',
      id: 42365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '02/06/2005',
      birthDate: '12/09/2018',
      city: 'מגדל משה'
    },
    {
      name: 'חיים מוסקוביץ',
      id: 123623478,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '02/06/2005',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      id: 82365478,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '02/06/2005',
      birthDate: '08/08/2020',
      city: 'אילת'
    },
    {
      name: 'גלי אפשטיין',
      id: 32365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '02/06/2005',
      birthDate: '20/12/2020',
      city: 'תל אביב'
    },
    {
      name: 'יפעת מלכא',
      id: 52365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '25/07/2019',
      city: 'ירושלים'
    },
    {
      name: 'שמואל תורגמן',
      id: 12365478,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד גלעד שי',
      id: 32365478,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '02/06/2005',
      birthDate: '15/04/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'שלמה קרסנר',
      id: 22365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '02/06/2005',
      birthDate: '25/07/2018',
      city: 'רעננה'
    },
    {
      name: 'שלומי זעירא',
      id: 42365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '02/06/2005',
      birthDate: '12/09/2018',
      city: 'מגדל משה'
    },
    {
      name: 'חיים מוסקוביץ',
      id: 123623478,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '02/06/2005',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      id: 82365478,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '02/06/2005',
      birthDate: '08/08/2020',
      city: 'אילת'
    },
    {
      name: 'גלי אפשטיין',
      id: 32365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '02/06/2005',
      birthDate: '20/12/2020',
      city: 'תל אביב'
    },
    {
      name: 'יפעת מלכא',
      id: 52365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '25/07/2019',
      city: 'ירושלים'
    },
    {
      name: 'שמואל תורגמן',
      id: 12365478,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד גלעד שי',
      id: 32365478,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '02/06/2005',
      birthDate: '15/04/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'שלמה קרסנר',
      id: 22365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '02/06/2005',
      birthDate: '25/07/2018',
      city: 'רעננה'
    },
    {
      name: 'שלומי זעירא',
      id: 42365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '02/06/2005',
      birthDate: '12/09/2018',
      city: 'מגדל משה'
    },
    {
      name: 'חיים מוסקוביץ',
      id: 123623478,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '02/06/2005',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      id: 82365478,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '02/06/2005',
      birthDate: '08/08/2020',
      city: 'אילת'
    },
    {
      name: 'גלי אפשטיין',
      id: 32365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '02/06/2005',
      birthDate: '20/12/2020',
      city: 'תל אביב'
    },
    {
      name: 'יפעת מלכא',
      id: 52365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '25/07/2019',
      city: 'ירושלים'
    },
    {
      name: 'שמואל תורגמן',
      id: 12365478,
      type: 'גמלאי',
      department: 'עיצוב',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '01/02/2020',
      city: 'ירושלים'
    },
    {
      name: 'עו"ד גלעד שי',
      id: 32365478,
      type: 'עובד',
      department: 'תכנות',
      role: 'מזכיר החברה',
      startDate: '02/06/2005',
      birthDate: '15/04/2019',
      city: 'פתח תקווה'
    },
    {
      name: 'שלמה קרסנר',
      id: 22365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'סמנכ"ל תכנון והנדסה',
      startDate: '02/06/2005',
      birthDate: '25/07/2018',
      city: 'רעננה'
    },
    {
      name: 'שלומי זעירא',
      id: 42365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'סמנכ"ל תפעול ואחזקה',
      startDate: '02/06/2005',
      birthDate: '12/09/2018',
      city: 'מגדל משה'
    },
    {
      name: 'חיים מוסקוביץ',
      id: 123623478,
      type: 'לקוח',
      department: 'עיצוב',
      role: 'סמנכ"ל הקמה',
      startDate: '02/06/2005',
      birthDate: '01/12/2019',
      city: 'ירושלים'
    },
    {
      name: 'רו"ח דניאל סובל',
      id: 82365478,
      type: 'גמלאי',
      department: 'תכנות',
      role: 'מנהל מסחרי ופיתוח עסקי',
      startDate: '02/06/2005',
      birthDate: '08/08/2020',
      city: 'אילת'
    },
    {
      name: 'גלי אפשטיין',
      id: 32365478,
      type: 'עובד',
      department: 'משאבי אנוש',
      role: 'מבקרת פנים',
      startDate: '02/06/2005',
      birthDate: '20/12/2020',
      city: 'תל אביב'
    },
    {
      name: 'יפעת מלכא',
      id: 52365478,
      type: 'עובד',
      department: 'אחרים',
      role: 'מנכ"ל',
      startDate: '02/06/2005',
      birthDate: '25/07/2019',
      city: 'ירושלים'
    },
    {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
      {
        name: 'שמואל תורגמן',
        id: 12365478,
        type: 'גמלאי',
        department: 'עיצוב',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '01/02/2020',
        city: 'ירושלים'
      },
      {
        name: 'עו"ד גלעד שי',
        id: 32365478,
        type: 'עובד',
        department: 'תכנות',
        role: 'מזכיר החברה',
        startDate: '02/06/2005',
        birthDate: '15/04/2019',
        city: 'פתח תקווה'
      },
      {
        name: 'שלמה קרסנר',
        id: 22365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'סמנכ"ל תכנון והנדסה',
        startDate: '02/06/2005',
        birthDate: '25/07/2018',
        city: 'רעננה'
      },
      {
        name: 'שלומי זעירא',
        id: 42365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'סמנכ"ל תפעול ואחזקה',
        startDate: '02/06/2005',
        birthDate: '12/09/2018',
        city: 'מגדל משה'
      },
      {
        name: 'חיים מוסקוביץ',
        id: 123623478,
        type: 'לקוח',
        department: 'עיצוב',
        role: 'סמנכ"ל הקמה',
        startDate: '02/06/2005',
        birthDate: '01/12/2019',
        city: 'ירושלים'
      },
      {
        name: 'רו"ח דניאל סובל',
        id: 82365478,
        type: 'גמלאי',
        department: 'תכנות',
        role: 'מנהל מסחרי ופיתוח עסקי',
        startDate: '02/06/2005',
        birthDate: '08/08/2020',
        city: 'אילת'
      },
      {
        name: 'גלי אפשטיין',
        id: 32365478,
        type: 'עובד',
        department: 'משאבי אנוש',
        role: 'מבקרת פנים',
        startDate: '02/06/2005',
        birthDate: '20/12/2020',
        city: 'תל אביב'
      },
      {
        name: 'יפעת מלכא',
        id: 52365478,
        type: 'עובד',
        department: 'אחרים',
        role: 'מנכ"ל',
        startDate: '02/06/2005',
        birthDate: '25/07/2019',
        city: 'ירושלים'
      },
  ];

  // cars = [];
  // brands: string[] = ['Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Jaguar', 'Mercedes', 'Renault', 'Volvo', 'VW'];
  // colors: string[] = ['Black', 'White', 'Red', 'Blue', 'Silver', 'Green', 'Yellow'];

  constructor() { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'שם מלא' },
      { field: 'id', header: 'תעודת זהות' },
      { field: 'type', header: 'סוג איש קשר' },
      { field: 'department', header: 'מחלקה' },
      { field: 'role', header: 'תפקיד' },
      { field: 'startDate', header: 'כניסה לחברה' },
      { field: 'birthDate', header: 'תאריך לידה' },
      { field: 'city', header: 'יישוב' },
      { field: 'removeBtn', header: '' },
    ];

    // this.cols = [
    //   {field: 'vin', header: 'Vin'},
    //   {field: 'year', header: 'Year'},
    //   {field: 'brand', header: 'Brand'},
    //   {field: 'color', header: 'Color'}
    // ];

    // this.cars = Array.from({length: 10000}).map(() => this.generateCar());

  }


// generateCar() {
//     return {
//         vin: 'bla bla bla',
//         brand: this.generateBrand(),
//         color: this.generateColor(),
//         year: this.generateYear()
//   }
// }

// generateBrand() {
//   return this.brands[Math.floor(Math.random() * Math.floor(10))];
// }

// generateColor() {
//     return this.colors[Math.floor(Math.random() * Math.floor(7))];
// }

// generateYear() {
//     return 2000 + Math.floor(Math.random() * Math.floor(19));
// }

}
