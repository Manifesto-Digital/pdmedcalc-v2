# Rules of the calculator #

## Background to the medicines ##

All of the Parkinson’s medicines can be split into different categories. This is of relevance when it comes to calculations as will be explained.

### Levodopa ###

- Sinemet
- Madopar
- Stalevo

It is important to highlight that the nomenclature of these medicines is a bit confusing. For example, Sinemet is also known as co-careldopa, and Madopar as co-beneldopa – both names
need to be present to avoid confusion.

Furthermore, the dose for these medicines is confusingly written like this – 125mg (25/100mg). Levodopa has to be delivered with a ‘co-medicine’ (dopa decarboxylase inhibitor (DDI)) to stop it
being broken down in the body before it gets to where it needs to be to work. The ratio of levodopa to the DDI is, in most cases 1:4. 25/100mg therefore means that in this tablet
there is 100mg levodopa (the active stuff that is of relevance to the calculator) and 25mg of DDI (which doesn’t need to be counted within the calculator).

Stalevo is also a bit confusing, as this medicine has three things in it – levodopa, DDI and entacapone (a medicine designed to prolong the effect of levodopa) – this is written as follows: Stalevo 50mg (50/12.5/200) – in this, the levodopa bit is 50mg, the DDI bit is 12.5mg and the entacapone is 200mg. With stalevo, entacapone is always 200mg. The ratio of levodopa to DDI in it is, as per above, always 1:4.

### Dopamine Agoninsts ###

- Ropinirole (Requip XL)
- Ropinirole (Immediate Release)
- Pramipexole (Mirapexin) Prolonged Release
- Pramipexole (Mirapexin)
- Rotigotine

It is important to flag up that again, the nomenclature of these medications can be a bit confusing too. Pramipexole, in particular, as the dosing is written with both base and salt. There are conversion rates for both dose and salt, but for simplicity we ought to use the salt, as the multiplication factor is 100.

### COMT inhibitors ###

- Entacapone
- Tolcapone
- Opicapone

It is important to note that calculations for these medicines work differently. These medicines are all designed to prolong the effect of levodopa by preventing its breakdown. With these medicines, the conversion to levodopa equivalent dose happens once the total levodopa equivalent dose has already been summed for other medicines. The additional contribution from these drugs is then calculated and added.

For example, this patient takes two medicines:

- Sinemet 25/100mg four times a day; LED = 4 x 100 = 400mg
- Entacapone 200mg four times a day; contribution for this = 400mg x 0.33 = 132mg
- Actual total daily LED is therefore 400 + 132 = 532mg

Note that, in practice, patients would only ever be on one COMT inhibitor, we wouldn't prescribe more than one of them as there would be no value in doing so (once the COMT enzyme is blocked, it's blocked).

### Other ###

- Amantadine can be ignored within calculations, and doesn’t need to appear in the list of available medications.

## OUTPUTS OF THE CALCULATOR ##

1. Dispersible madopar split across four dose times
2. Transdermal rotigotine patch

### Dispersible madopar ###

- Dose choices are 12.5/50mg (50mg levodopa) and 25/100mg (100mg levodopa)
- As the dose choices for the dispersible madopar are 50mg levodopa or 100mg levodopa, if a patient's total daily LED is not a multiple of 50, it should first be rounded to the nearest 50 (e.g. a total daily LED of 532mg would be rounded up to 550mg and a total daily LED of 812.5mg would be rounded down to 800mg)
- The total LED has to be divided into four doses – this may require different doses at different times.
- If the output of the calculator is such that all four doses are not the same size, then bigger doses should be given towards the front end of the day.

### Rotigotine patch ###

- Comes in 2mg increment doses
- It’s not recommended to cut the patch in half, so doses of 3mg for example, are a no-go
- The maximum dose is 16mg
- The total dose calculated therefore needs to be either rounded up or down to a multiple of 2mg. If the result is within 0.5mg of the upper bound (e.g. 3.6mg), round up. Otherwise, round down then round (e.g 3.4mg would be rounded down to 2mg).
- Between the 2014 calculator and the 2024 calculator, there has been a change in levodopa equivalence for rotigotine. In 2014, 1mg of rotigotine equated to 20mg of levodopa. Based on the latest data, 1mg of rotigotine equates to 30mg of levodopa.


#### For calculations behind output #2 (rotigotine patch) ####

- For non-dopamine agonist medicines, there is a risk that the dose of patch calculated by the tool will be too high, and risks causing confusion. A correction factor of 0.25 therefore needs to be applied so as to reduce the dose.
- For dopamine agonist medicines, a correction factor is NOT required and a direct conversion from dopamine agonist to patch can be done.
