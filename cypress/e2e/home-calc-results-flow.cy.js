describe('Tests for the main purpose of the app i.e. conversion of medicines entered on the calculator page', () => {
  beforeEach(() => {
    cy.visit('https://pdmedcalc-v2.pages.dev/');
    cy.contains('Accept & continue').click();
  })

  it('Produces correct output when user enters just one medicine that is neither a comt inhibitor nor a dopamine agonist', () => {

    cy.get('#med-input-1').select('Madopar (Co-beneldopa) 125mg (25/100mg)');
    cy.get('#freq-for-med-input-1').select('4');
    cy.get("#add-btn-1").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('have.text', '1');
    cy.get('#eightAmSmallMadoparDose').should('not.exist');
    cy.get('#twelvePmBigMadoparDose').should('have.text', '1');
    cy.get('#twelvePmSmallMadoparDose').should('not.exist');
    cy.get('#fourPmBigMadoparDose').should('have.text', '1');
    cy.get('#fourPmSmallMadoparDose').should('not.exist');
    cy.get('#eightPmBigMadoparDose').should('have.text', '1');
    cy.get('#eightPmSmallMadoparDose').should('not.exist');

    cy.get('#option2Quantity').should('have.text', '4');
  })

  it('Produces correct output when user enters just one medicine that is a dopamine agonist', () => {

    cy.get('#med-input-1').select('Pramipexole (Mirapexin) 700µg base (1mg salt)');
    cy.get('#freq-for-med-input-1').select('3');
    cy.get("#add-btn-1").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('have.text', '1');
    cy.get('#eightAmSmallMadoparDose').should('not.exist');
    cy.get('#twelvePmBigMadoparDose').should('have.text', '1');
    cy.get('#twelvePmSmallMadoparDose').should('not.exist');
    cy.get('#fourPmBigMadoparDose').should('not.exist');
    cy.get('#fourPmSmallMadoparDose').should('have.text', '1');
    cy.get('#eightPmBigMadoparDose').should('not.exist');
    cy.get('#eightPmSmallMadoparDose').should('have.text', '1');

    cy.get('#option2Quantity').should('have.text', '10');
  })

  it('Produces correct output when user enters just one medicine that is a comt inhibitor', () => {

    cy.get('#med-input-1').select('Opicapone 50mg');
    cy.get('#freq-for-med-input-1').select('5');
    cy.get("#add-btn-1").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('not.exist');
    cy.get('#eightAmSmallMadoparDose').should('not.exist');
    cy.get('#twelvePmBigMadoparDose').should('not.exist');
    cy.get('#twelvePmSmallMadoparDose').should('not.exist');
    cy.get('#fourPmBigMadoparDose').should('not.exist');
    cy.get('#fourPmSmallMadoparDose').should('not.exist');
    cy.get('#eightPmBigMadoparDose').should('not.exist');
    cy.get('#eightPmSmallMadoparDose').should('not.exist');

    cy.get('#option2Quantity').should('have.text', '0');
  })

  it('Produces correct output when user enters (just) a dopamine agonist and a comt inhibitor', () => {

    cy.get('#med-input-1').select('Ropinirole (Requip XL) 6mg');
    cy.get('#freq-for-med-input-1').select('1');
    cy.get("#add-btn-1").click();
    cy.get('#med-input-2').select('Entacapone 200mg');
    cy.get('#freq-for-med-input-2').select('1');
    cy.get("#add-btn-2").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('not.exist');
    cy.get('#eightAmSmallMadoparDose').should('have.text', '1');
    cy.get('#twelvePmBigMadoparDose').should('not.exist');
    cy.get('#twelvePmSmallMadoparDose').should('have.text', '1');
    cy.get('#fourPmBigMadoparDose').should('not.exist');
    cy.get('#fourPmSmallMadoparDose').should('not.exist');
    cy.get('#eightPmBigMadoparDose').should('not.exist');
    cy.get('#eightPmSmallMadoparDose').should('not.exist');

    cy.get('#option2Quantity').should('have.text', '4');
  })

  it('Produces correct output when user enters (just) a dopamine agonist AND a medicine that is neither a dopamine agonist nor a comt inhibitor', () => {

    cy.get('#med-input-1').select('Ropinirole (Requip XL) 2mg');
    cy.get('#freq-for-med-input-1').select('1');
    cy.get("#add-btn-1").click();
    cy.get('#med-input-2').select('Half Sinemet (Co-careldopa) CR 25/100mg');
    cy.get('#freq-for-med-input-2').select('4');
    cy.get("#add-btn-2").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('have.text', '1');
    cy.get('#eightAmSmallMadoparDose').should('not.exist');
    cy.get('#twelvePmBigMadoparDose').should('have.text', '1');
    cy.get('#twelvePmSmallMadoparDose').should('not.exist');
    cy.get('#fourPmBigMadoparDose').should('have.text', '1');
    cy.get('#fourPmSmallMadoparDose').should('not.exist');
    cy.get('#eightPmBigMadoparDose').should('not.exist');
    cy.get('#eightPmSmallMadoparDose').should('have.text', '1');

    cy.get('#option2Quantity').should('have.text', '4');
  })

  it('Produces correct output when user enters (just) a comt inhibitor and a medicine that is neither a dopamine agonist nor a comt inhibitor', () => {

    cy.get('#med-input-1').select('Sinemet (Co-careldopa) 110mg (10/100mg)');
    cy.get('#freq-for-med-input-1').select('5');
    cy.get("#add-btn-1").click();
    cy.get('#med-input-2').select('Opicapone 50mg');
    cy.get('#freq-for-med-input-2').select('5');
    cy.get("#add-btn-2").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('have.text', '2');
    cy.get('#eightAmSmallMadoparDose').should('not.exist');
    cy.get('#twelvePmBigMadoparDose').should('have.text', '2');
    cy.get('#twelvePmSmallMadoparDose').should('not.exist');
    cy.get('#fourPmBigMadoparDose').should('have.text', '2');
    cy.get('#fourPmSmallMadoparDose').should('not.exist');
    cy.get('#eightPmBigMadoparDose').should('have.text', '1');
    cy.get('#eightPmSmallMadoparDose').should('have.text', '1');

    cy.get('#option2Quantity').should('have.text', '6');
  })

  it('Produces correct output when user enters a dopamine agonist, a comt inhibitor and a medicine that is neither a dopamine agonist nor a comt inhibitor', () => {

    cy.get('#med-input-1').select('Madopar (Co-beneldopa) CR 125mg (25/100mg)');
    cy.get('#freq-for-med-input-1').select('4');
    cy.get("#add-btn-1").click();
    cy.get('#med-input-2').select('Pramipexole (Mirapexin) 700µg base (1mg salt)');
    cy.get('#freq-for-med-input-2').select('4');
    cy.get("#add-btn-2").click();
    cy.get('#med-input-3').select('Tolcapone 100mg');
    cy.get('#freq-for-med-input-3').select('4');
    cy.get("#add-btn-3").click();
    cy.contains('button', 'Calculate').click();

    cy.get('#eightAmBigMadoparDose').should('have.text', '2');
    cy.get('#eightAmSmallMadoparDose').should('have.text', '1');
    cy.get('#twelvePmBigMadoparDose').should('have.text', '2');
    cy.get('#twelvePmSmallMadoparDose').should('not.exist');
    cy.get('#fourPmBigMadoparDose').should('have.text', '2');
    cy.get('#fourPmSmallMadoparDose').should('not.exist');
    cy.get('#eightPmBigMadoparDose').should('have.text', '2');
    cy.get('#eightPmSmallMadoparDose').should('not.exist');

    cy.get('#option2Quantity').should('have.text', '16');
  })
})